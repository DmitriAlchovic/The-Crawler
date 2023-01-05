import React from 'react';
import styles from './RegisterLoginCard.module.sass';

export default function RegisterLoginCard() {
  return (
    <div className={styles['login-register-container']}>
      <form>
        <label className={styles.label} htmlFor="email">
          Enter address*
          <input
            className={styles.input}
            id="email"
            placeholder="johndoe@gmail.com"
          />
        </label>
        <label className={styles.label} htmlFor="password">
          Password*
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="Maximum 8 characters"
          />
        </label>
      </form>
      <div className={styles['login-register-btn']} role="button">
        Register Now
      </div>
    </div>
  );
}
