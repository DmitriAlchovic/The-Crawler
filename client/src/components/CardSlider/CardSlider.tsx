/* eslint-disable operator-linebreak */
import React from 'react';
import './CardSlider.sass';
import arrow from '../../assets/arrow.svg';
import { Category } from '../../store/reducers/categorySlice';

interface CardSliderProps {
  children: React.ReactNode;
  index: number;
  title: string;
  selection: Category[] | null;
  activeCategory: string;
  sliderHandler(step: number): void;
  categoryHandler(category: string): void;
  sliderSize: number;
  cardsCount: number;
}

export default function CardSlider({
  children,
  index,
  title,
  selection,
  activeCategory,
  sliderHandler,
  categoryHandler,
  sliderSize,
  cardsCount,
}: CardSliderProps) {
  return (
    <div className="cardSliderContainer">
      <div className="sliderHeader">
        <div>
          <h1>{title}</h1>
        </div>
        <div className="category-selector">
          <div
            className={
              activeCategory === 'All' ? 'active-category' : 'category'
            }
            role="button"
            tabIndex={-1}
            onKeyDown={() => {}}
            onClick={() => {
              categoryHandler('All');
            }}
          >
            All
          </div>
          {selection &&
            selection.map(({ name }) => (
              <div
                className={
                  activeCategory === name ? 'active-category' : 'category'
                }
                key={name}
                role="button"
                tabIndex={-1}
                onKeyDown={() => {}}
                onClick={() => {
                  categoryHandler(name);
                }}
              >
                {name}
              </div>
            ))}
        </div>
      </div>
      <div className="sliderBody">
        <div className="arrow-container">
          {index - sliderSize > 0 && (
            <div
              className="arrow-left"
              role="button"
              tabIndex={-1}
              onKeyDown={() => {}}
              onClick={() => {
                sliderHandler(-1);
              }}
            >
              <img alt="left arrow" src={arrow} />
            </div>
          )}
        </div>
        <div className="card-container">{children}</div>
        <div className="arrow-container">
          {cardsCount >= index && (
            <div
              className="arrow-right"
              role="button"
              tabIndex={-1}
              onKeyDown={() => {}}
              onClick={() => {
                sliderHandler(1);
              }}
            >
              <img alt="right arrow" src={arrow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
