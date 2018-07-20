import * as React from 'react';
import Info from './info';
import * as styles from './user-info.css';

interface Props {
  info: any;
}

export default class UserInfo extends React.PureComponent<Props, null> {

  render() {
    const { info } = this.props;
    
    if (!info) return null;

    return (
      <div className={styles.container}>
        <Info.Airbnb info={info}/>
      </div>
    )
  }
}