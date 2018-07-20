import * as React from 'react';
import * as styles from './info.css';

interface Props {
  info: any;
}

const Airbnb:React.SFC<Props> = ({ info }) => {

  return (
    <div className={styles.container}>
      <div>{info.name}, {info.country}, {info.joined}, {info.reviews} reviews</div>
      <div>verified: {info.verified}</div>
    </div>
  )
}

export default Airbnb;