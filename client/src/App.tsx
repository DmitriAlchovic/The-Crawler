import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainPage from './pages/MainPage';
import paths from './utils/paths';
import './App.sass';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={paths.mainPage} element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
