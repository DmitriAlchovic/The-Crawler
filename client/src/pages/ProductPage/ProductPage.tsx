import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchProduct } from '../../store/reducers/productSlice';
import cart from '../../assets/shopping-cart.svg';
import styles from './ProductPage.module.sass';
import { addCartItem } from '../../store/reducers/cartSlice';
import ProductPageHeader from '../../components/ProductPageHeader';
import ProductPageFooter from '../../components/ProductPageFooter';
import paths from '../../utils/paths';

export default function ProductPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { product, error } = useAppSelector((state) => state.product);
  const { items } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(parseInt(productId, 10)));
    }
  }, [productId]);

  useEffect(() => {
    if (error) {
      navigator(paths.errorPage);
    }
  }, [error]);

  const quantityHandler = (changer: number) => {
    if (
      quantity + changer !== 0
      && product
      && product.inventory.currentQuantity >= quantity + changer
    ) {
      setQuantity(quantity + changer);
    }
  };

  useEffect(() => {
    if (product) {
      const inCart = items.find(
        ({ productId: inCartId }) => inCartId === product.productId,
      );
      if (inCart) {
        setIsInCart(true);
      } else setIsInCart(false);
    }
  }, [items, isInCart, product]);

  return (
    <div className={styles['page-container']}>
      <div>
        <img
          className={styles['product-img']}
          alt="product"
          src={product?.gallery}
        />
      </div>
      {product && (
        <div className={styles['info-container']}>
          <ProductPageHeader
            categoryName={product.subcategory.category.name}
            productName={product.name}
            price={product.price}
            discountPercent={product.discount.discountPercent}
          />
          <div className={styles.desc}>{product?.desc}</div>
          {product.inventory.currentQuantity && (
            <ProductPageFooter
              quantityHandler={quantityHandler}
              initialQuantity={product.inventory.initialQuantity}
              currentQuantity={product.inventory.currentQuantity}
              quantity={quantity}
            />
          )}
          {product && product.inventory.currentQuantity && (
            <button
              type="button"
              disabled={isInCart}
              onKeyDown={() => {}}
              tabIndex={-1}
              className={isInCart ? styles['btn-disabled'] : styles['add-btn']}
              onClick={() => {
                if (product) {
                  dispatch(
                    addCartItem({ productId: product.productId, quantity }),
                  );
                }
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
      )}
    </div>
  );
}
