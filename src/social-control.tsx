import * as React from 'react';
// import Fetch from './components/fetch'
// import * as styles from './index.css';
import SearchForm from './components/search-form';


interface Props {}
interface State {
  url: string;
}

export default class SocialControl extends React.PureComponent<Props, {}> {

  state = { url: '' };

  private handleFormSubmit = (url:string) => this.setState({ url });
  render() {

    return (
      <div>
        <SearchForm
          onSubmit={this.handleFormSubmit}
        />
        {/* <Fetch 
          url="https://google.com"
          getResponse={console.log}
        /> */}
      </div>
    )
  }
}