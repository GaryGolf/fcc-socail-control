import * as React from 'react';
import * as fetchJsonp from 'fetch-jsonp';

interface Props {
  url: string;
  getResponse: (html:string) => void;
}

export default class Fetch extends React.PureComponent<Props, {}> {
  constructor(props:Props) {
    super(props)
  }

  componentDidMount() {
    this.fetch(this.props.url)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url != nextProps.url) this.fetch(nextProps.url);
  }

  private fetch = (url:string) => {

    const { getResponse } = this.props;

    fetchJsonp(`https://allorigins.me/get?url=${encodeURIComponent(url)}`)
      .then(response => response.json())
      .then(json => {
        if (!json || !json.contents || !json.status) getResponse(null); // throw error
        else if(json.status.http_code != 200 ) getResponse(null);
        else getResponse(json.contents);
      })
      .catch(e => { console.log('error occured')})
  }

  render() {
    return null;
  }

}