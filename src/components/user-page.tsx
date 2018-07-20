import * as React from 'react';
import * as styles from './user-page.css';

interface Props {
  html: string;
}

const UserPage:React.SFC<Props>  = ({ html }) => {

  if (!html) return null;

  const handleClick = (event:React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

  const blob = new Blob([html], {type:'text/html'});
  const url = window.URL.createObjectURL(blob);
  
  return (
    <div className={styles.container}>
      <div className={styles.shield} onClick={handleClick}/>
      <iframe className={styles.frame} src={url}/>
    </div>
  )
}

export default UserPage;
