import * as React from 'react';
import Info from './info';

interface Props {
  info: any;
}

export default class UserInfo extends React.PureComponent<Props, null> {

  render() {
    const { info } = this.props;
    
    if (!info) return null;

    return (
      <div className="">
        <Info.Airbnb info={info}/>
      </div>
    )
  }
}