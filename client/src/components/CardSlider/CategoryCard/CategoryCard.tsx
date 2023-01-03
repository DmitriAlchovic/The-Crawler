import React from 'react';
import { Link } from 'react-router-dom';
import { Subcategory } from '../../../store/reducers/categorySlice';
import paths from '../../../utils/paths';
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
        index >= sliderIndex - sliderSize && index < sliderIndex
          ? 'category-container'
          : 'container-hidden'
      }
    >
      <div>
        <Link to={`${paths.categoryPage}${category.name}/1`}>
          <div className="img-container">
            <img className="category-img" alt="no img" src={category.image} />
          </div>
          <div className="category-name">{category.name}</div>
        </Link>
      </div>
    </div>
  );
}
