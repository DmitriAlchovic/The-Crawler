import React from 'react';
import styles from './ProductCardLoader.module.sass';

interface ProductCardLoaderProps {
  cardCount: number;
}

export default function ProductCardLoader({
  cardCount,
}: ProductCardLoaderProps) {
  const cardLoaders = () => {
    const cards = [];
    for (let index = 0; index < cardCount; index += 1) {
      cards.push(
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <div className={styles.img}>
              <div className={styles.loader} />
            </div>
            <div className={styles.name}>
              <div className={styles.loader} />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.price}>
              <div className={styles.loader} />
            </div>
            <div className={styles.quantity}>
              <div className={styles.loader} />
            </div>
            <div className={styles.button}>
              <div className={styles.loader} />
            </div>
          </div>
        </div>,
      );
    }
    return cards;
  };

  return <div className={styles['main-container']}>{cardLoaders()}</div>;
}
