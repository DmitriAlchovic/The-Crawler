import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainPage from './pages/MainPage';
import paths from './utils/paths';
import './App.sass';
import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';

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
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
