import React from 'react';
import findPercent from '../../utils/findPercent';
import arrow from '../../assets/icon_arrow.svg';
import styles from './ProductPageFooter.module.sass';

interface ProductPageFooterProps {
  quantityHandler(quantity: number): void;
  initialQuantity: number;
  currentQuantity: number;
  quantity: number;
}

export default function ProductPageFooter({
  quantityHandler,
  initialQuantity,
  currentQuantity,
  quantity,
}: ProductPageFooterProps) {
  return (
    <div className={styles['product-footer']}>
      <div className={styles['quantity-changer']}>
        <button
          type="button"
          className={quantity + 1 <= currentQuantity ? styles['arrow-up'] : `${styles.disabled} ${styles['arrow-up']}`}
          onClick={() => {
            quantityHandler(1);
          }}
        >
          <img alt="up" src={arrow} />
        </button>
        <div className={styles.quantity}>{quantity}</div>
        <button
          type="button"
          className={quantity - 1 !== 0 ? styles['arrow-down'] : `${styles.disabled} ${styles['arrow-down']}`}
          onClick={() => {
            quantityHandler(-1);
          }}
        >
          <img alt="down" src={arrow} />
        </button>
      </div>

      <div className={styles['bar-container']}>
        <div
          className={styles['quantity-bar']}
          style={{
            width: `${findPercent(initialQuantity, currentQuantity)}%`,
          }}
        />
      </div>

      <div className={styles['product-quantity']}>
        {`Sold: ${currentQuantity}/${initialQuantity}`}
      </div>
    </div>
  );
}
