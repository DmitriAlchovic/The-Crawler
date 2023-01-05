import React from 'react';
import { Product } from '../../../store/reducers/sliderSlice';
import cart from '../../../assets/shopping-cart-green.svg';
import './ProductCard.sass';

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
  return (
    <div
      className={index >= (sliderIndex - sliderSize) && index < sliderIndex ? 'product-card-container' : 'card-hiden'}
    >
      <div>
        <img className="product-image" alt="product" src={product.gallery} />
      </div>
      <div className="card-body">
        <div className="category">{product.subcategory.category.name}</div>
        <div className="product-name">{product.name}</div>
      </div>
      <div>
        <div className="card-footer">
          <div className="price">{`${product.price}$`}</div>
          <div className="add-button">
            <img className="cart" alt="cart" src={cart} />
            <span>Add</span>
          </div>
        </div>
      </div>
    </div>
  );
}
