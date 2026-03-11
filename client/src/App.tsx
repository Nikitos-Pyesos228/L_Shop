import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Catalog } from './components/Catalog';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/catalog" element={<Catalog />} />
        {/* Редирект с главной на каталог */}
        <Route path="*" element={<Navigate to="/catalog" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;