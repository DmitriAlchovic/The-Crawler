import React from 'react';
import { Link } from 'react-router-dom';
import { Discount } from '../../../store/reducers/sliderSlice';
import paths from '../../../utils/paths';
import styles from './Slide.module.sass';

interface SlideProps {
  productId: number;
  index: number;
  sliderIndex: number;
  discount: Discount;
  name: string;
  price: number;
  gallery: string;
}

export default function Slide({
  productId,
  index,
  sliderIndex,
  discount,
  name,
  price,
  gallery,
}: SlideProps) {
  return (
    <div
      className={index === sliderIndex ? styles['slider-content-container'] : styles.hidden}
    >
      <div className={styles['slider-info']}>
        {discount.name && <p className={styles['slider-text']}>{discount.name}</p>}
        <Link to={`${paths.productPage}${productId}`}>
          <p className={styles['slider-text']}>
            {`${name} $${price - price * (discount.discountPercent / 100)} `}
            {discount.discountPercent && (
              <span className={styles['price-without-discount']}>{`$${price}`}</span>
            )}
          </p>
        </Link>
        {discount.discountPercent && (
          <p className={styles.discount}>{`Save ${discount.discountPercent}%`}</p>
        )}
      </div>
      <div>
        <Link to={`${paths.productPage}${productId}`}>
          <img className={styles['img-container']} alt="no img" src={gallery} />
        </Link>
      </div>
    </div>
  );
}
