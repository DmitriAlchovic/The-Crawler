import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.sass';
import paths from '../../utils/paths';

export default function ErrorPage() {
  return (
    <div className={styles['page-container']}>
      <div className={styles.header}>404</div>
      <div className={styles.message}>Oops! - page not found</div>
      <div className={styles.body}>
        Page you are looking for might have been removed had it’s name changed
        or is temporary unavailable.
      </div>
      <Link to={paths.mainPage}>
        <button className={styles.button} type="button">Back home</button>
      </Link>
    </div>
  );
}
