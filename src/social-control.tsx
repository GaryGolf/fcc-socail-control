import * as React from 'react';
import * as fetchJsonp from 'fetch-jsonp';
import SearchForm from './components/search-form';
import UserInfo from './components/user-info';
import UserPage from './components/user-page';
import { config } from './config';

import * as styles from './social-control.css';


interface Props {}
interface State {
  html: string;
  message: string;
}

export default class SocialControl extends React.PureComponent<Props, State> {

  private parser:DOMParser;
  private network:string;

  constructor(props:Props) {
    super(props)

    this.parser = new DOMParser();
    this.state = { html: '' , message: null };
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
    const info = this.extractUserInfo(html);
    return (
      <div className={styles.container}>
        <h1 style={{position: 'fixed', padding: '3rem',bottom:0, right:0}}>{message}</h1>
        <UserPage html={html}/>
        <div className={styles.plate}>
          <SearchForm onSubmit={this.handleFormSubmit}/>
          <UserInfo info={info}/>
        </div>
      </div>
    )
  }
}
