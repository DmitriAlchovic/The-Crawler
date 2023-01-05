import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCategories } from '../../../store/reducers/categorySlice';
import search from '../../../assets/search.svg';
import Dropdown from '../Dropdown';
import styles from './Searchbar.module.sass';
import { fetchProductBySearch } from '../../../store/reducers/searchSlice';
import SearchResult from './SearchResult';
import SearchResultLoader from './SearchResultLoader';

export default function Searchbar() {
  const [activeCategory, setActiveCategory] = useState('All categories');
  const [searchInput, setSearchInput] = useState('');
  const { categories } = useAppSelector((state) => state.categories);
  const { products, loading } = useAppSelector((state) => state.search);
  const [isShown, setIsShown] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (searchInput) {
      dispatch(
        fetchProductBySearch({
          categoryName: activeCategory,
          searchStr: searchInput,
        }),
      );
    }
  }, [searchInput]);

  return (
    <div className={styles['search-bar']}>
      <div className={styles['category-search']}>
        <div className={styles['category-selector']}>
          <Dropdown hasChildrenClose>
            <div>
              <div
                role="button"
                tabIndex={-1}
                onKeyDown={() => {}}
                onClick={() => {
                  setActiveCategory('All categories');
                }}
                className={styles.category}
              >
                All categories
              </div>
              {categories?.map(({ name }) => (
                <div
                  key={name}
                  role="button"
                  tabIndex={-1}
                  onKeyDown={() => {}}
                  onClick={() => {
                    setActiveCategory(name);
                    setSearchInput('');
                  }}
                  className={styles.category}
                >
                  {name}
                </div>
              ))}
            </div>
          </Dropdown>
          <div className={styles['active-category']}>{activeCategory}</div>
        </div>
        <div className={styles['input-container']}>
          <div className={styles['border-right']} />
          <input
            className={styles['search-input']}
            placeholder="Search for items"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setIsShown(true);
            }}
            onFocus={() => {
              setIsShown(true);
            }}
          />
          <div className={styles['search-options']}>
            {loading && isShown && <SearchResultLoader itemsCount={4} />}
            {products && isShown && searchInput && (
              <>
                <div
                  aria-label="label"
                  tabIndex={-1}
                  role="button"
                  onKeyDown={() => {}}
                  className={styles['result-background']}
                  onClick={() => {
                    setIsShown(!isShown);
                  }}
                />

                <SearchResult products={products} searchInput={searchInput} />
              </>
            )}
          </div>
        </div>
      </div>
      <button className={styles['search-btn']} type="button">
        <img alt="search" src={search} />
      </button>
    </div>
  );
}
