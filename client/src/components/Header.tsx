import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/instance';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('user');
      navigate('/login');
      window.location.reload(); 
    } catch (error) {
      console.error('Ошибка при выходе');
    }
  };

  return (
    <header style={{ 
      display: 'flex', justifyContent: 'space-between', padding: '15px 50px', 
      background: '#111', borderBottom: '1px solid #d4af37', alignItems: 'center' 
    }}>
      <Link to="/catalog" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' }}>
        L_SHOP ELITE
      </Link>
      
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/catalog" style={{ color: '#ccc', textDecoration: 'none' }}>Каталог</Link>
        
        {user ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ color: '#d4af37', fontSize: '14px' }}>👤 {user.login}</span>
            <button 
              onClick={handleLogout} 
              style={{ background: 'none', border: '1px solid #444', color: '#888', cursor: 'pointer', padding: '3px 8px' }}
            >
              Выход
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}>Войти</Link>
            <Link to="/register" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '14px' }}>Регистрация</Link>
          </div>
        )}
        
        <Link to="/basket" style={{ textDecoration: 'none', fontSize: '20px' }}>🛒</Link>
      </nav>
    </header>
  );
};