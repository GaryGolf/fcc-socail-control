import * as React from 'react';
import Info from './info';

interface Props {
  info: any;
}

export default class UserInfo extends React.PureComponent<Props, null> {

  render() {
    const { info } = this.props;
    if (!info) return null;

    switch(info.network) {
      case 'airbnb' :
        return <Info.Airbnb info={info}/>;
      case 'ebay' :
        return <Info.Ebay info={info}/>;
      default :
        return null;
    }
  }
}