/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartProducts } from '../../services/productService';
import type { RootState } from '../store';
import { Product } from './sliderSlice';

export type CartItem = {
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
>('cart/fetchUserCart', async (_, { getState }) => {
  const { items } = getState().cart;
  const response = await getCartProducts(items);
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
    addCartItem(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) {
      const inCart = state.items.find(
        ({ productId }) => productId === action.payload.productId,
      );
      if (!inCart) {
        state.items.push({
          productId: action.payload.productId,
          quantity: action.payload.quantity,
        });
      }
    },
    changeQuantity(
      state,
      action: PayloadAction<{ itemIdx: number; quantityItem: number }>,
    ) {
      const { itemIdx, quantityItem } = action.payload;
      const { productId, quantity } = state.items[itemIdx];
      const product = state.products?.find(
        ({ productId: id }) => id === productId,
      );
      if (quantity + quantityItem <= 0) {
        state.items = [
          ...state.items.slice(0, itemIdx),
          ...state.items.slice(itemIdx + 1),
        ];
      } else if (
        product
        && product.inventory.currentQuantity
          >= quantity + quantityItem
      ) {
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
