/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../store/reducers/sliderSlice';
import cart from '../../assets/shopping-cart.svg';
import styles from './ProductInfoCard.module.sass';
import ProductInfo from './ProductInfo/ProductInfo';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCartItem } from '../../store/reducers/cartSlice';
import paths from '../../utils/paths';

interface ProductInfoCardProps {
  product: Product;
}

export default function ProductInfoCard({ product }: ProductInfoCardProps) {
  const { discountPercent } = product.discount;
  const { initialQuantity, currentQuantity } = product.inventory;
  const { category } = product.subcategory;
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const inCart = items.find(
      ({ productId }) => productId === product.productId,
    );
    if (inCart) {
      setIsInCart(true);
    } else setIsInCart(false);
  }, [items]);

  return (
    <div className={styles['product-info-container']}>
      <Link to={`${paths.productPage}${product.productId}`}>
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
        <ProductInfo
          initialQuantity={initialQuantity}
          currentQuantity={currentQuantity}
          price={product.price}
          discountPercent={discountPercent}
        />
      </Link>
      {product.inventory.currentQuantity && (
        <button
          type="button"
          disabled={isInCart}
          onKeyDown={() => {}}
          tabIndex={-1}
          className={isInCart ? styles['btn-disabled'] : styles['add-btn']}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              addCartItem({ productId: product.productId, quantity: 1 }),
            );
          }}
        >
          {isInCart ? (
            <div>In cart</div>
          ) : (
            <>
              <img alt="cart" src={cart} />
              <span>Add to cart</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
