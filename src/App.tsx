import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { GlobalStyles } from './GlobalStyles';
import { HomePage } from './pages/HomePage/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage/MovieDetailsPage';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useDisableDefaults } from './hooks/useDisableDefaults';

function AppInner() {
  useKeyboardNavigation();
  useDisableDefaults();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <AppInner />
      </BrowserRouter>
    </Provider>
  );
}

export default App;