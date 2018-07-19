import * as React from 'react';
import Fetch from './components/fetch'
// import * as styles from './index.css';


interface Props {}

export default class SocialControl extends React.PureComponent<Props, {}> {

  render() {

    return (
      <div>
        <div>Hello</div>
        <Fetch 
          url="https://google.com"
          getResponse={console.log}
        />
      </div>
    )
  }
}