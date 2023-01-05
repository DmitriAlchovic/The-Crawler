/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './sliderSlice';

type ProductState = {
  product: Product | null;
  loading: boolean;
  error: string | null;
};

export const fetchProduct = createAsyncThunk<Product, number>(
  'product/fetchProduct',
  async (productId) => {
    const response = await fetch(`http://localhost:5000/api/product/${productId}`);
    const data = await response.json();
    return data;
  },
);

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

const sliderSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      });
  },
});

export default sliderSlice.reducer;
