import * as React from 'react';
import * as fetchJsonp from 'fetch-jsonp';
import SearchForm from './components/search-form';
import UserInfo from './components/user-info';
import UserPage from './components/user-page';
import { config } from './config';

import * as styles from './social-control.css';
import { encode } from 'punycode';


interface Props {}
interface State {
  html: string;
  message: string;
}

declare interface RequestInit {
  mode: RequestMode | string;
}

export default class SocialControl extends React.PureComponent<Props, State> {

  private parser:DOMParser;
  private network:string;
  private info: any;

  constructor(props:Props) {
    super(props)

    this.parser = new DOMParser();
    this.state = { html: '' , message: null };
  }

  private sendUserInfo = () => {
    const options = { 
      method: 'POST', 
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" ,
        'Access-Control-Allow-Origin':'*' 
      },
      body: this.info 
    };
    fetch('https://imaginary.com/imaginary', options).then(console.log);
  }

  private getNetwork = (url:string):string => {
    if (!url) return null;

    const { hostname } = new URL(url)
    const network = Object.keys(config).find(key => config[key].hosts.includes(hostname));
    return network || null;
  }

  private extractUserInfo = (html: string) => {
    
    const { network, parser } = this;
    if (!html || !network) return null;
    const { extractor } = config[network];
    const xml = parser.parseFromString(html, 'text/html');

    return Object.keys(extractor).reduce((acc, key) => { 
        let value = '...';
        try { value = extractor[key](xml) } 
        catch(error) { console.log(error) }
        return { ...acc, [key]:value }
      }, { network });
  }

  private handleFormSubmit = (url:string) => {

    this.network = this.getNetwork(url)
    if(!this.network) return;

    this.setState({ message: '...loading' })

    fetchJsonp(`https://allorigins.me/get?url=${encodeURIComponent(url)}`)
      .then(response => response.json())
      .then(json => {
        if (!json || !json.contents || !json.status || json.status.http_code != 200 ) return;

        this.setState({ html:json.contents, message: null });
      })
      .catch(e => {
        console.log('error occured ', e);
        this.setState({ message: 'error' });
      })
  }

  render() {
    const { html, message } = this.state;
    this.info = this.extractUserInfo(html);
    const isDisabled = message == '...loading';
    const btnStyle = [ styles.confirm , !this.info ? styles.hidden : ''].join(' ');
    return (
      <div className={styles.container}>
        <h1 style={{position: 'fixed', margin:'3rem', bottom:0, right:0}}>{message}</h1>
        <UserPage html={html}/>
        <div className={styles.plate}>
          <SearchForm disabled={isDisabled} onSubmit={this.handleFormSubmit}/>
          {!isDisabled && <UserInfo info={this.info}/> }
          <button className={btnStyle} onClick={this.sendUserInfo} disabled={isDisabled}>
            I confirm this is my account
          </button>
        </div>
      </div>
    )
  }
}
