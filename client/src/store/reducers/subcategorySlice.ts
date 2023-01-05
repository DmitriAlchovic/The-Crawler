/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './sliderSlice';

type SubcategoryState = {
  products: Product[];
  pages: number;
  loading: boolean;
  error: string | null;
};

type SubcategoryFetchProductsData = {
  categoryName: string,
  page: string,
};

export const fetchSubcategoryProducts = createAsyncThunk<
{ products: Product[]; count: number },
SubcategoryFetchProductsData
>('subcategory/fetchSubcategoryProducts', async ({ categoryName, page }) => {
  const response = await fetch(
    `http://localhost:5000/api/subcategory/${categoryName}/${page}`,
  );
  const data = await response.json();
  return data;
});

const initialState: SubcategoryState = {
  products: [],
  pages: 0,
  loading: false,
  error: null,
};

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategoryProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pages = Math.ceil(action.payload.count / 10);
        state.loading = false;
      });
  },
});

export default subcategorySlice.reducer;
