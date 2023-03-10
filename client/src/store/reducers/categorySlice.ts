/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategoryByName, getCategoryList } from '../../services/categoryService';
import { getProductByCategory } from '../../services/productService';
import { Product } from './sliderSlice';

export type Subcategory = {
  name: string;
  image: string;
  items: number;
};

export type Category = {
  name: string;
};

type CategoryState = {
  categories: Category[] | null;
  subcategories: Subcategory[] | null;
  products: Product[] | null;
  loading: boolean;
  error: string | null;
};

export const fetchSubcategories = createAsyncThunk<Subcategory[], string>(
  'subcategory/fetchSubcategories',
  async (categoryName) => {
    const response = await getCategoryByName(categoryName);
    const data = await response.json();
    return data;
  },
);

export const fetchCategories = createAsyncThunk<Category[], void>(
  'category/fetchCategories',
  async () => {
    const response = await getCategoryList();
    const data = await response.json();
    return data;
  },
);

export const fetchProductFromCategory = createAsyncThunk<Product[], string>(
  'product/fetchProductFromCategory',
  async (categoryName) => {
    const response = await getProductByCategory(categoryName);
    const data = await response.json();
    return data;
  },
);

const initialState: CategoryState = {
  categories: null,
  subcategories: null,
  products: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.subcategories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductFromCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductFromCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
