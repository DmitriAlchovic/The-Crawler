import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeIndex, fetchFeatured } from '../../store/reducers/sliderSlice';
import { RootState } from '../../store/store';
import Slide from './Slide/Slide';
import styles from './Slider.module.sass';

export default function Slider() {
  const dispatch = useAppDispatch();
  const {
    index: sliderIndex,
    products,
    loading,
  } = useAppSelector((state: RootState) => state.slider);

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  useEffect(() => {
    const sliderTimer = setTimeout(() => {
      if ((sliderIndex + 1) <= (products.length - 1)) {
        dispatch(changeIndex(sliderIndex + 1));
      } else dispatch(changeIndex(0));
    }, 5000);

    return () => {
      clearTimeout(sliderTimer);
    };
  }, [sliderIndex, products]);

  return (
    <div className={styles['slider-container']}>
      {loading && (
        <div className={styles.loader}>
          <div className={styles['animated-background']} />
        </div>
      )}
      {products && (
        <div>
          <div className={styles['radio-container']}>
            {products.map(({ productId }, index) => (
              <input
                readOnly
                checked={index === sliderIndex}
                className={styles['slider-radio']}
                key={productId}
                type="radio"
                onClick={() => {
                  dispatch(changeIndex(index));
                }}
              />
            ))}
          </div>
          {products.map(
            ({
              productId, price, name, discount, gallery,
            }, index) => (
              <Slide
                key={productId}
                productId={productId}
                price={price}
                name={name}
                discount={discount}
                index={index}
                sliderIndex={sliderIndex}
                gallery={gallery}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
