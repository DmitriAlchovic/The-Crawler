import React from 'react';
import styles from './Info.module.sass';

export default function Info() {
  return (
    <div className={styles['info-container']}>
      <div className={styles.info}>
        <p className={styles.header}>Best Prices & Deals</p>
        <p className={styles.body}>
          Don&apos;t miss our daily amazing deals prices
        </p>
      </div>
      <div className={styles.info}>
        <p className={styles.header}>Refundable</p>
        <p className={styles.body}>
          If your items have damage we agree to refund it
        </p>
      </div>
      <div className={styles.info}>
        <p className={styles.header}>Free delivery</p>
        <p className={styles.body}>
          Do purchase over $50 and get free delivery anywher
        </p>
      </div>
    </div>
  );
}
