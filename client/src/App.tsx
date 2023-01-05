import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainPage from './pages/MainPage';
import paths from './utils/paths';
import './App.sass';
import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={paths.mainPage} element={<MainPage />} />
            <Route path={`${paths.productPage}:productId`} element={<ProductPage />} />
            <Route path={`${paths.categoryPage}:categoryName/:page`} element={<CategoryPage />} />
            <Route path={`${paths.errorPage}`} element={<ErrorPage />} />
            <Route path="*" element={<Navigate to={`${paths.errorPage}`} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
