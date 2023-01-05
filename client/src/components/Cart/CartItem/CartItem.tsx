import React from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { changeQuantity } from '../../../store/reducers/cartSlice';
import { Product } from '../../../store/reducers/sliderSlice';
import ProductInfo from '../../ProductInfoCard/ProductInfo';
import arrow from '../../../assets/icon_arrow.svg';
import styles from './CartItem.module.sass';

interface CartItemProps {
  product: Product;
  itemIdx: number;
  item: { productId: number; quantity: number };
}

export default function CartItem({ product, itemIdx, item }: CartItemProps) {
  const { discountPercent } = product.discount;
  const { category } = product.subcategory;
  const { initialQuantity, currentQuantity } = product.inventory;
  const dispatch = useAppDispatch();

  return (
    <div className={styles['item-container']}>
      <div className={styles['info-header']}>
        {discountPercent && (
          <div className={styles.discount}>{`Save ${discountPercent}%`}</div>
        )}
        <img
          className={styles['product-img']}
          alt="no img"
          src={product.gallery}
        />
        <div className={styles['info-container']}>
          <div className={styles.category}>{category.name}</div>
          <div className={styles['product-name']}>{product.name}</div>
          <div className={styles['quantity-conatainer']}>
            <button
              className={styles['quantity-cahanger']}
              type="button"
              onClick={() => {
                dispatch(changeQuantity({ itemIdx, quantityItem: 1 }));
              }}
            >
              <img alt="up" src={arrow} />
            </button>
            <div className={styles['quantity-cahanger']}>{item?.quantity}</div>
            <button
              className={styles['quantity-cahanger']}
              onClick={() => {
                dispatch(changeQuantity({ itemIdx, quantityItem: -1 }));
              }}
              type="button"
            >
              <img className={styles['arrow-down']} alt="down" src={arrow} />
            </button>
          </div>
          <div className={styles['price-container']}>
            <ProductInfo
              initialQuantity={initialQuantity}
              price={product.price}
              currentQuantity={currentQuantity}
              discountPercent={discountPercent}
            />
          </div>
          {item && (
            <div className={styles['summ-container']}>
              {`Total: $${
                (product.price
                - (product.price * (discountPercent / 100))) * item.quantity
              }`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
