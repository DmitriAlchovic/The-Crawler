import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../store/reducers/sliderSlice';
import cart from '../../../assets/shopping-cart-green.svg';
import './ProductCard.sass';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addCartItem } from '../../../store/reducers/cartSlice';
import paths from '../../../utils/paths';

interface ProductCardProps {
  product: Product;
  index: number;
  sliderIndex: number;
  sliderSize: number;
}

export default function ProductCard({
  product,
  index,
  sliderIndex,
  sliderSize,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
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
    <div
      className={
        index >= sliderIndex - sliderSize && index < sliderIndex
          ? 'product-card-container'
          : 'card-hidden'
      }
    >
      <Link to={`${paths.productPage}${product.productId}`}>
        <div>
          <img className="product-image" alt="product" src={product.gallery} />
        </div>
        <div className="card-body">
          <div className="category">{product.subcategory.category.name}</div>
          <div className="product-name">{product.name}</div>
        </div>
      </Link>
      <div>
        <div className="card-footer">
          <div className="price">
            {`${
              product.price
            - product.price * (product.discount.discountPercent / 100)
            }$`}
          </div>
          <button
            type="button"
            disabled={isInCart}
            onKeyDown={() => {}}
            tabIndex={-1}
            className={isInCart ? 'button-disabled' : 'add-button'}
            onClick={() => {
              dispatch(
                addCartItem({ productId: product.productId, quantity: 1 }),
              );
            }}
          >
            {isInCart ? (
              <div>In cart</div>
            ) : (
              <>
                <img className="cart" alt="cart" src={cart} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
