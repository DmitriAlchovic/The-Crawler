import React from 'react';
import styles from './SearchResultLoader.module.sass';

interface SearchResultLoaderProps {
  itemsCount: number;
}

export default function SearchResultLoader({
  itemsCount,
}: SearchResultLoaderProps) {
  const resultLoaders = () => {
    const cards = [];
    for (let index = 0; index < itemsCount; index += 1) {
      cards.push(
        <div key={index} className={styles.item}>
          <div className={styles.img}>
            <div className={styles.loader} />
          </div>
          <div className={styles.name}>
            <div className={styles.loader} />
          </div>
          <div className={styles.btn}>
            <div className={styles.loader} />
          </div>
        </div>,
      );
    }
    return cards;
  };
  return <div className={styles.container}>{resultLoaders()}</div>;
}
