import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { BasketPage } from './pages/Basket/BasketPage';
import { DeliveryPage } from './pages/Delivery/DeliveryPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff' }}>
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;