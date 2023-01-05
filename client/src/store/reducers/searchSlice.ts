/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './sliderSlice';

export type Category = {
  name: string;
};

type CategoryState = {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
};

export const fetchProductBySearch = createAsyncThunk<
Product[],
{ categoryName: string; searchStr: string }
>('search/fetchProductByCategory', async ({ categoryName, searchStr }) => {
  const response = await fetch(
    `http://localhost:5000/api/product/search/${categoryName}/${searchStr}`,
  );
  const data = await response.json();
  return data;
});

const initialState: CategoryState = {
  products: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySearch.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
