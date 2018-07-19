import * as React from 'react';
// import Fetch from './components/fetch'
// import * as styles from './index.css';
import SearchForm from './components/search-form';


interface Props {}

export default class SocialControl extends React.PureComponent<Props, {}> {

  render() {

    return (
      <div>
        <SearchForm/>
        {/* <Fetch 
          url="https://google.com"
          getResponse={console.log}
        /> */}
      </div>
    )
  }
}