/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeaturedProduct } from '../../services/productService';

export type Inventory = {
  currentQuantity: number;
  initialQuantity: number;
};

export type Subcategory = {
  name: string;
  category: { name: string };
};

export type Discount = {
  name: string;
  discountPercent: number;
};

export type Product = {
  productId: number;
  name: string;
  price: number;
  discount: Discount;
  gallery: string;
  subcategory: Subcategory;
  inventory: Inventory;
  desc: string;
  count: number;
};

type SliderState = {
  index: number;
  products: Product[];
  loading: boolean;
  error: string | null;
};

export const fetchFeatured = createAsyncThunk<Product[], void>(
  'slider/fetchFeatured',
  async () => {
    const response = await getFeaturedProduct();
    const data = await response.json();
    return data;
  },
);

const initialState: SliderState = {
  index: 0,
  products: [],
  loading: false,
  error: null,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    changeIndex(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatured.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export const { changeIndex } = sliderSlice.actions;

export default sliderSlice.reducer;
