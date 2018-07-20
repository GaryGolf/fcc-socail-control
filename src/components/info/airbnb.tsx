import * as React from 'react';

interface Props {
  info: any;
}

const Airbnb:React.SFC<Props> = ({ info }) => {

  return (
    <div>
      <div>{info.name}, {info.country}, {info.joined}, {info.reviews} reviews</div>
      <div>verified: {info.verified}</div>
    </div>
  )
}

export default Airbnb;