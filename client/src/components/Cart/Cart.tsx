/* eslint-disable operator-linebreak */
import React, { useEffect } from 'react';
import Dropdown from '../Dropdown';
import cartIcon from '../../assets/icon_cart_black.svg';
import styles from './Cart.module.sass';
import CartItem from './CartItem';
import cartIconWhite from '../../assets/shopping-cart.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserCart } from '../../store/reducers/cartSlice';

export default function Cart() {
  const { cart } = useAppSelector((state) => state);
  const { items, products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserCart(''));
  }, [items]);

  const totalSum = () => {
    const total = items.reduce((prev, { productId: id, quantity }): number => {
      if (products) {
        const index = products.findIndex(({ productId }) => productId === id);
        if (index >= 0) {
          return prev + products[index].price * quantity;
        }
      }
      return prev;
    }, 0);
    return total;
  };

  const totalDisc = () => {
    const total = items.reduce((prev, { productId: id, quantity }): number => {
      if (products) {
        const index = products.findIndex(({ productId }) => productId === id);
        if (index >= 0) {
          const { price } = products[index];
          const { discountPercent } = products[index].discount;
          const priceWithDisc =
            Math.round((price - price * (discountPercent / 100)) * 100) / 100;
          return prev + priceWithDisc * quantity;
        }
      }
      return prev;
    }, 0);
    return total;
  };

  return (
    <div className={styles['cart-container']}>
      <Dropdown hasChildrenClose={false}>
        <div>
          <div className={styles['items-container']}>
            {products &&
              products.map((product) => {
                const itemIdx = items.findIndex(
                  ({ productId }) => productId === product.productId,
                );
                const item = items[itemIdx];
                return (
                  <CartItem
                    key={product.productId}
                    product={product}
                    itemIdx={itemIdx}
                    item={item}
                  />
                );
              })}
          </div>
          <div className={styles['cart-footer']}>
            <div>
              Total:
              {`$${totalDisc()}`}
              {totalSum() !== totalDisc() && totalSum() && (
                <span className={styles['non-discount-price']}>
                  {`$${totalSum()}`}
                </span>
              )}
            </div>
            <button className={styles['submit-btn']} type="button">
              <img
                className={styles['cart-icon']}
                alt="cart"
                src={cartIconWhite}
              />
              Submit
            </button>
          </div>
        </div>
      </Dropdown>
      <div className={styles['cart-btn-container']}>
        <div className={styles['icon-container']}>
          <img alt="cart" src={cartIcon} />
          <div className={styles['items-count']}>
            {cart.items.reduce((prev, { quantity }) => prev + quantity, 0)}
          </div>
        </div>
        <div className={styles['cart-info']}>
          <div>My cart</div>
          <div className={styles.sum}>{`$${totalDisc()}`}</div>
        </div>
      </div>
    </div>
  );
}
