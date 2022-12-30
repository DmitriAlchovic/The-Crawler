import React from 'react';
import PriceWithDiscount from '../../utils/priceWithDiscount';
import styles from './ProductPageHeader.module.sass';

interface ProductPageHeaderProps {
  categoryName: string;
  productName: string;
  discountPercent: number;
  price: number;
}

export default function ProductPageHeader({
  categoryName,
  productName,
  discountPercent,
  price,
}: ProductPageHeaderProps) {
  return (
    <div className={styles['info-header']}>
      <div className={styles.category}>
        {categoryName}
      </div>
      <div className={styles['product-name']}>{productName}</div>
      {discountPercent && (
        <div className={styles.discount}>
          {`Save: ${discountPercent}%`}
        </div>
      )}
      <div className={styles.price}>
        <div>
          {discountPercent
            ? `$${
              PriceWithDiscount(price, discountPercent)}`
            : `$${price}`}
          {discountPercent && (
            <span className={styles['initial-price']}>
              {`$${price}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
