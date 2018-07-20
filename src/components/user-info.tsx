import * as React from 'react';
import Fetch from './fetch';
import UserPage from './user-page';
import * as URL from 'url-parse';
import { access } from 'fs';

interface Props {
  url: string;
}
interface State {
  html: string;
}

const config = {
  airbnb: {
    hosts: ['www.airbnb.com.au'],
    extractor: {
      reviews: xml =>  xml.querySelector('#undefined_count').firstChild.textContent
      // name: xml => {
      //   const title = xml.querySelector('title').textContent;
      //   const end = title.indexOf('\'');
      //   return title.substring(0, end);
      // }
      
    }
  }
}

export default class UserInfo extends React.PureComponent<Props, State> {

  private parser:DOMParser;

  constructor(props:Props) {
    super(props);
    this.state = { html: '' };
    this.parser = new DOMParser()
  }

  private handleServerResponse = (html:string) => this.setState({ html });

  private extractUserRep = () => {
    const { url } = this.props;
    const { html } = this.state;
    
    if (!url || !html) return null;

    const a = document.createElement('a'); a.href = url;
    const network = Object.keys(config)
      .find(key => config[key].hosts.includes(a.hostname));
    
    if (!network) return null

    const { extractor } = config[network];
    const xml = this.parser.parseFromString(html, 'text/html');

    return Object.keys(extractor)
      .reduce((acc, key) => ({ ...acc, [key]:extractor[key](xml) }), {})
  }

  render() {
    const { url } = this.props;
    const { html } = this.state;

    const rep = this.extractUserRep()

    console.log('reput: ', rep);



    return (
      <div className="">
        <Fetch  
          url={url}
          getResponse={this.handleServerResponse}
        />
        <UserPage html={html}/>
      </div>
    )
  }
}