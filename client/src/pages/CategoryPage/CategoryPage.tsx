import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductInfoCard from '../../components/ProductInfoCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchSubcategoryProducts } from '../../store/reducers/subcategorySlice';
import paths from '../../utils/paths';
import styles from './CategoryPage.module.sass';

export default function CategoryPage() {
  const { categoryName, page } = useParams();
  const { products, pages } = useAppSelector((state) => state.subcategory);
  const dispatch = useAppDispatch();
  const [pagesLinks, setPagesLinks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (categoryName && page) {
      dispatch(fetchSubcategoryProducts({ categoryName, page }));
    }
  }, [dispatch, categoryName, page]);

  useEffect(() => {
    if (page) {
      const pageNumber = parseInt(page, 10);
      const pagesCount = [];
      for (let i = 1; i <= pages; i += 1) {
        pagesCount.push(
          <Link
            to={`${paths.categoryPage}${categoryName}/${i}`}
          >
            <div
              className={
                pageNumber === i
                  ? `${styles['active-link']} ${styles.link}`
                  : styles.link
              }
            >
              {i}
            </div>
          </Link>,
        );
      }
      setPagesLinks(pagesCount);
    }
  }, [pages, page]);

  return (
    <div className={styles['page-container']}>
      <div className={styles['card-container']}>
        {products
          && products.map((product) => (
            <ProductInfoCard key={product.productId} product={product} />
          ))}
      </div>
      {pages && <div className={styles.pages}>{pagesLinks}</div>}
    </div>
  );
}
