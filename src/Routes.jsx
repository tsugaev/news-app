import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SingleNewsPage from './pages/SingleNewsPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/news/:id" element={<SingleNewsPage />} />
  </Routes>
);

