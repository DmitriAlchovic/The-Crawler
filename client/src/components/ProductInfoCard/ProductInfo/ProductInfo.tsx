/* eslint-disable max-len */
import React from 'react';
import styles from './ProductInfo.module.sass';

interface ProductInfoProps {
  initialQuantity: number;
  price: number;
  currentQuantity: number;
  discountPercent: number;
}

export default function ProductInfo({
  initialQuantity,
  price,
  currentQuantity,
  discountPercent,
}: ProductInfoProps) {
  const findPercent = (initial: number, current: number): number => Math.floor((current / initial) * 100);

  return (
    <div className={styles['info-body']}>
      <div className={styles['discount-price']}>
        {discountPercent ? `$${price - price * (discountPercent / 100)}` : `$${price}`}
        {discountPercent && <span className={styles['product-price']}>{`$${price}`}</span>}
      </div>
      {initialQuantity && (
        <div>
          <div className={styles['quantity-bar-container']}>
            <div
              className={styles['quantity-bar']}
              style={{
                width: `${findPercent(initialQuantity, currentQuantity)}%`,
              }}
            />
          </div>
          <div className={styles.quantity}>
            {`Sold: ${currentQuantity}/${initialQuantity}`}
          </div>
        </div>
      )}
    </div>
  );
}
