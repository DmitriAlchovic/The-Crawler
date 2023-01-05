import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeIndex, fetchFeatured } from '../../store/reducers/sliderSlice';
import './Slider.sass';

export default function Slider() {
  const dispatch = useAppDispatch();
  const slideIndex = useAppSelector((state) => state.slider.index);
  const products = useAppSelector((state) => state.slider.products);

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  const slides = products.map(
    ({
      productId, name, price, discount, gallery,
    }, index) => (
      <div
        key={productId}
        className={index === slideIndex ? 'sliderContentContainer' : 'hiden'}
      >
        <div className="sliderInfo">
          {discount.name && <p className="sliderText">{discount.name}</p>}
          <p className="sliderText">
            {`${name} $${price - price * (discount.discountPercent / 100)} `}
            {discount.discountPercent && <span className="priceWithoutDiscount">{`$${price}`}</span>}
          </p>
          {discount.discountPercent && <p className="discount">{`Save ${discount.discountPercent}%`}</p>}
        </div>
        <div>
          <img className="imgContainer" alt="no img" src={gallery} />
        </div>
      </div>
    ),
  );

  return (
    <div className="sliderContainer">
      <div className="radioContainer">
        {products.map(({ name }, index) => (
          <input
            readOnly
            checked={index === slideIndex}
            className="sliderRadio"
            key={name}
            type="radio"
            onClick={() => {
              dispatch(changeIndex(index));
            }}
          />
        ))}
      </div>
      {slides}
    </div>
  );
}
