/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Product } from './sliderSlice';

type CartItem = {
  productId: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  products: Product[] | null;
  loading: boolean;
  error: string | null;
};

export const fetchUserCart = createAsyncThunk<
Product[],
string,
{ state: RootState }
>('cart/fetchUsercart', async (token, { getState }) => {
  const { cart } = getState();
  const response = await fetch('http://localhost:5000/api/product/list', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(cart.items),
  });
  const data = await response.json();
  return data;
});

const initialState: CartState = {
  items: [],
  products: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<number>) {
      const inCart = state.items.find(
        ({ productId }) => productId === action.payload,
      );
      if (!inCart) {
        state.items.push({ productId: action.payload, quantity: 1 });
      }
    },
    changeQuantity(
      state,
      action: PayloadAction<{ itemIdx: number; quantityItem: number }>,
    ) {
      const { itemIdx, quantityItem } = action.payload;
      const { productId, quantity } = state.items[itemIdx];
      if (quantity + quantityItem <= 0) {
        state.items = [
          ...state.items.slice(0, itemIdx),
          ...state.items.slice(itemIdx + 1),
        ];
      } else {
        state.items = [
          ...state.items.slice(0, itemIdx),
          { productId, quantity: quantity + quantityItem },
          ...state.items.slice(itemIdx + 1),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      });
  },
});

export const { addCartItem, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
