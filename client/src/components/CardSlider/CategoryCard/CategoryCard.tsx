import React from 'react';
import { Subcategory } from '../../../store/reducers/categorySlice';
import './CategoryCard.sass';

interface CategoryCardProps {
  category: Subcategory;
  index: number;
  sliderIndex: number;
  sliderSize: number;
}

export default function CategoryCard({
  category,
  index,
  sliderIndex,
  sliderSize,
}: CategoryCardProps) {
  return (
    <div
      className={
        index >= (sliderIndex - sliderSize) && index < sliderIndex ? 'category-container' : 'container-hiden'
      }
    >
      <div>
        <div className="img-container">
          <img className="category-img" alt="no img" src={category.image} />
        </div>
        <div className="category-name">{category.name}</div>
        <div className="category-items">{`items ${index}`}</div>
      </div>
    </div>
  );
}
