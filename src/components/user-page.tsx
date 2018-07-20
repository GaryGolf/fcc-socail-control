import * as React from 'react';
import * as styles from './user-page.css';

interface Props {
  html: string;
}

const UserPage:React.SFC<Props>  = ({ html }) => {

  if (!html) return null;

  const handleClick = (event:React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

  return (
    <div className={styles.container}>
      <div className={styles.shield} onClick={handleClick}/>
      <div  dangerouslySetInnerHTML={{__html:html}}/>
    </div>
  )
}

export default UserPage;
