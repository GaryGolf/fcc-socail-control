import * as React from 'react';

interface Props {
  info: any;
}

export default class UserInfo extends React.PureComponent<Props, null> {

  render() {
    const { info } = this.props;
    
    if (!info) return null;

    return (
      <div className="">
        {info}
      </div>
    )
  }
}