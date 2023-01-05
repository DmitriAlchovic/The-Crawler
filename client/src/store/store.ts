import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './reducers/sliderSlice';
import categoryReducer from './reducers/categorySlice';
import searchReducer from './reducers/searchSlice';
import cartReducer from './reducers/cartSlice';

const store = configureStore({
  reducer: {
    slider: sliderReducer,
    categories: categoryReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
