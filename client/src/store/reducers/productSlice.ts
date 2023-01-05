/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProduct } from '../../services/productService';
import { Product } from './sliderSlice';

type ProductState = {
  product: Product | null;
  loading: boolean;
  error: string | null;
};

export const fetchProduct = createAsyncThunk<Product, number, { rejectValue: Error } >(
  'product/fetchProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProduct(productId);
      const data = await response.json();
      if (!response.ok) { throw new Error(data.message); }
      return data;
    } catch (error:any) {
      return rejectWithValue(error);
    }
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
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
        state.loading = false;
      });
  },
});

export default sliderSlice.reducer;
