import React, { useState } from 'react';
import { api } from '../../api/instance';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { login, password });
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/catalog');
    } catch (err) {
      alert('Ошибка входа!');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', background: '#222', border: '1px solid #d4af37' }}>
      <h2 style={{ color: '#d4af37', textAlign: 'center' }}>Вход</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)} required />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" style={{ background: '#d4af37', padding: '10px', fontWeight: 'bold' }}>ВОЙТИ</button>
      </form>
    </div>
  );
};