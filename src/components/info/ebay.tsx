import * as React from 'react';
import * as styles from './info.css';

interface Props {
  info: any;
}

const Ebay:React.SFC<Props> = ({ info }) => {

  return (
    <div className={styles.container}>
      <div>{info.name}, {info.feedback}, {info.positive}, {info.rating} </div>
    </div>
  )
}

export default Ebay;
