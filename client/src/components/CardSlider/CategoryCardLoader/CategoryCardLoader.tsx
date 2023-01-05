import React from 'react';
import styles from './CategoryCardLoader.module.sass';

interface CategoryCardLoaderProps {
  cardsCount: number;
}

export default function CategoryCardLoader({
  cardsCount,
}: CategoryCardLoaderProps) {
  const cardsDisplay = () => {
    const cards = [];
    for (let index = 1; index <= cardsCount; index += 1) {
      cards.push(<div key={index} className={styles.card} />);
    }
    return cards;
  };

  return <div className={styles.container}>{cardsDisplay()}</div>;
}
