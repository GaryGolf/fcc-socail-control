import * as React from 'react';
// import * as styles from './index.css';
import SearchForm from './components/search-form';
import UserInfo from './components/user-info';


interface Props {}
interface State {
  url: string;
}

export default class SocialControl extends React.PureComponent<Props, {}> {

  state = { url: '' };

  private handleFormSubmit = (url:string) => this.setState({ url });


  render() {

    const { url } =this.state;

    return (
      <div>
        <SearchForm
          onSubmit={this.handleFormSubmit}
        />
        <UserInfo url={url}/>
      </div>
    )
  }
}