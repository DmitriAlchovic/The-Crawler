/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import CardSlider from '../../components/CardSlider';
import Slider from '../../components/Slider';
import Info from '../../components/Info';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProductCard from '../../components/CardSlider/ProductCard';
import CategoryCard from '../../components/CardSlider/CategoryCard';
import {
  fetchCategories,
  fetchProductFromCategory,
  fetchSubcategories,
} from '../../store/reducers/categorySlice';
import ProductInfoCard from '../../components/ProductInfoCard';
import './MainPage.sass';
import RegisterLoginCard from '../../components/RegisterLoginCard';
import Footer from '../../components/Footer';
import CategoryCardLoader from '../../components/CardSlider/CategoryCardLoader';
import ProductCardLoader from '../../components/ProductInfoCard/ProductCardLoader';

export default function MainPage() {
  const CATEGORY_SLIDER_SIZE = 7;
  const PRODUCT_SLIDER_SIZE = 5;
  const { products, loading: productsLoading } = useAppSelector(
    (state) => state.slider,
  );
  const {
    loading: subcategoriesLoading,
    subcategories,
    categories,
    products: categoryProducts,
  } = useAppSelector((state) => state.categories);
  const { profile } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  const [categorySliderIndex, setSliderIndex] = useState(CATEGORY_SLIDER_SIZE);
  const [productSliderIndex, setProductSliderIndex] =
    useState(PRODUCT_SLIDER_SIZE);
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [activeProductCategory, setActiveProductCategory] = useState('All');

  const categorySliderHandler = (step: number) => {
    setSliderIndex(categorySliderIndex + step);
  };

  const productSliderHandler = (step: number) => {
    setProductSliderIndex(productSliderIndex + step);
  };

  useEffect(() => {
    dispatch(fetchSubcategories(activeSubcategory));
  }, [dispatch, activeSubcategory]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductFromCategory(activeProductCategory));
  }, [dispatch, activeProductCategory]);

  const productCategoryHandler = (category: string) => {
    setActiveProductCategory(category);
  };

  const subcategoryCategoryHandler = (category: string) => {
    setActiveSubcategory(category);
  };
  return (
    <div>
      <Slider />
      {subcategoriesLoading && (
        <div className="subcategory-product-loader">
          <ProductCardLoader cardCount={5} />
        </div>
      )}
      {categoryProducts && (
        <CardSlider
          title="Featured Products"
          index={productSliderIndex}
          selection={categories}
          activeCategory={activeProductCategory}
          sliderHandler={productSliderHandler}
          categoryHandler={productCategoryHandler}
          sliderSize={PRODUCT_SLIDER_SIZE}
          cardsCount={categoryProducts.length - 1}
        >
          {categoryProducts &&
            categoryProducts.map((product, index) => (
              <ProductCard
                key={product.productId}
                product={product}
                index={index}
                sliderIndex={productSliderIndex}
                sliderSize={PRODUCT_SLIDER_SIZE}
              />
            ))}
        </CardSlider>
      )}
      {subcategoriesLoading && <CategoryCardLoader cardsCount={7} />}
      {subcategories && (
        <CardSlider
          title="Explore Categories"
          selection={categories}
          activeCategory={activeSubcategory}
          sliderHandler={categorySliderHandler}
          categoryHandler={subcategoryCategoryHandler}
          index={categorySliderIndex}
          sliderSize={CATEGORY_SLIDER_SIZE}
          cardsCount={subcategories.length - 1}
        >
          {subcategories.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
              sliderIndex={categorySliderIndex}
              sliderSize={CATEGORY_SLIDER_SIZE}
            />
          ))}
        </CardSlider>
      )}
      <div className="featured-header">
        <h1>Featured</h1>

        <div className="featured">
          {productsLoading && <ProductCardLoader cardCount={4} />}
          {products &&
            products.map((product) => (
              <ProductInfoCard key={product.productId} product={product} />
            ))}
          <div className="login-register-card">
            <p className="login-register-header">10% OFF</p>
            <p className="login-register-text">
              For new member sign up at the first time
            </p>
            {!profile && <RegisterLoginCard hasDefaultLogin={false} />}
          </div>
        </div>
      </div>
      <Info />
    </div>
  );
}
