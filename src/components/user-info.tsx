import * as React from 'react';
import Fetch from './fetch';
import UserPage from './user-page';

interface Props {
  url: string;
}
interface State {
  html: string;
}

export default class UserInfo extends React.PureComponent<Props, State> {

  constructor(props:Props) {
    super(props);
    this.state = { html: '' };
  }
  
  private handleServerResponse = (html:string) => this.setState({ html });

  render() {
    const { url } = this.props;
    const { html } = this.state;

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