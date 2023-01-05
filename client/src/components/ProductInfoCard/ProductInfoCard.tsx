/* eslint-disable max-len */
import React from 'react';
import { Product } from '../../store/reducers/sliderSlice';
import cart from '../../assets/shopping-cart.svg';
import styles from './ProductInfoCard.module.sass';

interface ProductInfoCardProps {
  product: Product;
}

export default function ProductInfoCard({ product }: ProductInfoCardProps) {
  const { discountPercent } = product.discount;
  const { initialQuantity, currentQuantity } = product.inventory;
  const { category } = product.subcategory;

  const findPrecent = (inititial: number, current: number): number => Math.floor((current / inititial) * 100);
  return (
    <div className={styles['product-info-container']}>
      <div className={styles['info-header']}>
        {discountPercent && (
          <div className={styles.discount}>{`Save ${discountPercent}%`}</div>
        )}
        <img
          className={styles['product-img']}
          alt="no img"
          src={product.gallery}
        />
        <div className={styles.category}>{category.name}</div>
        <div className={styles['product-name']}>{product.name}</div>
      </div>
      <div className={styles['info-body']}>
        <div className={styles['product-price']}>{`$${product.price}`}</div>
        {initialQuantity && (
          <div>
            <div className={styles['quantity-bar-container']}>
              <div
                className={styles['quantity-bar']}
                style={{
                  width: `${findPrecent(initialQuantity, currentQuantity)}%`,
                }}
              />
            </div>
            <div className={styles.quantity}>
              {`Sold: ${currentQuantity}/${initialQuantity}`}
            </div>
          </div>
        )}
      </div>
      <div className={styles['add-btn']}>
        <img alt="cart" src={cart} />
        <span>Add to cart</span>
      </div>
    </div>
  );
}
