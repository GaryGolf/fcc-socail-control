import * as React from 'react';
// import * as styles from './index.css';
import * as fetchJsonp from 'fetch-jsonp';
import SearchForm from './components/search-form';
import UserInfo from './components/user-info';
import UserPage from './components/user-page';
import { config } from './config';


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

    this.state = { html: '' , message: null };
  }

  private checkNetwork = (url:string):string => {
    if (!url) return null;
    const a = document.createElement('a'); a.href = url;
    const network = Object.keys(config).find(key => config[key].hosts.includes(a.hostname));
    a.remove();
    return network || null;
  }

  private extractUserInfo = (html: string) => {
    
    const { network, parser } = this;
    if (!html || !network) return null;
    const { extractor } = config[network];
    const xml = parser.parseFromString(html, 'text/html');

    return Object.keys(extractor)
      .reduce((acc, key) => ({ ...acc, [key]:extractor[key](xml) }), { network });
  }

  private handleFormSubmit = (url:string) => {

    this.network = this.checkNetwork(url)
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
    const info = null;
    return (
      <div>
        <h1 style={{position: 'fixed', padding: '3rem',bottom:0, right:0}}>{message}</h1>
        <UserPage html={html}/>
        <SearchForm onSubmit={this.handleFormSubmit}/>
        <UserInfo info={info}/>
      </div>
    )
  }
}