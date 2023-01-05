/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../store/reducers/sliderSlice';
import cart from '../../../../assets/shopping-cart-green.svg';
import styles from './SearchResult.module.sass';

interface SearchResultProps {
  searchInput: string;
  products: Product[];
}

export default function SearchResult({
  searchInput,
  products,
}: SearchResultProps) {
  return (
    <div className={styles['result-container']}>
      {searchInput &&
        products &&
        products.map(({ name, productId, price, gallery, discount }) => (
          <div className={styles['search-item']}>
            <Link key={productId} to={`/${productId}`}>
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
            <button type="button" className={styles['cart-btn']}>
              <img alt="cart" src={cart} />
              Add
            </button>
          </div>
        ))}
      {products && !products.length && <div>nothing found =/</div>}
    </div>
  );
}
