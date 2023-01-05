/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../store/reducers/sliderSlice';
import cart from '../../../../assets/shopping-cart-green.svg';
import styles from './SearchResult.module.sass';
import paths from '../../../../utils/paths';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addCartItem, CartItem } from '../../../../store/reducers/cartSlice';

interface SearchResultProps {
  searchInput: string;
  products: Product[];
}

export default function SearchResult({
  searchInput,
  products,
}: SearchResultProps) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const findItem = (cartItems: CartItem[], productId: number) => {
    const item = cartItems.find(
      ({ productId: inCart }) => inCart === productId,
    );

    if (item) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles['result-container']}>
      {searchInput &&
        products &&
        products.map(
          ({ name, productId, price, gallery, discount, inventory }) => (
            <div key={productId} className={styles['search-item']}>
              <Link key={productId} to={`${paths.productPage}${productId}`}>
                <img
                  className={styles['result-img']}
                  alt="product"
                  src={gallery}
                />
                {name}
                <div className={styles.price}>
                  {discount.discountPercent
                    ? `$${price - price * (discount.discountPercent / 100)}`
                    : `$${price}`}
                </div>
              </Link>
              {inventory.currentQuantity && (
                <div>
                  {findItem(items, productId) ? (
                    <button type="button" className={styles['disabled-btn']}>
                      In cart
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles['cart-btn']}
                      onClick={() => {
                        dispatch(addCartItem({ productId, quantity: 1 }));
                      }}
                    >
                      <img alt="cart" src={cart} />
                      Add
                    </button>
                  )}
                </div>
              )}
            </div>
          ),
        )}
      {products && !products.length && <div>nothing found =/</div>}
    </div>
  );
}
