import React, { useState } from 'react';
import { api } from '../../api/instance';
import { useNavigate, Link } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    login: '',
    email: '',
    phone: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Отправляем данные на бэкенд
      await api.post('/auth/register', formData);
      alert('Регистрация прошла успешно! Теперь войдите в систему.');
      navigate('/login');
    } catch (error) {
      alert('Ошибка регистрации. Возможно, такой логин уже занят.');
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '80px auto', padding: '30px', background: '#222', borderRadius: '12px', border: '1px solid #d4af37' }}>
      <h2 style={{ color: '#d4af37', textAlign: 'center', marginBottom: '25px' }}>Стать членом клуба L_SHOP</h2>
      
      {/* data-registration ОБЯЗАТЕЛЕН по ТЗ */}
      <form data-registration onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="name" placeholder="Ваше Имя" onChange={handleChange} required />
        <input name="login" placeholder="Логин (Никнейм)" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Электронная почта" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Номер телефона" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Придумайте пароль" onChange={handleChange} required />
        
        <button type="submit" style={{ 
          background: '#d4af37', color: '#000', padding: '12px', 
          fontWeight: 'bold', border: 'none', borderRadius: '4px', marginTop: '10px' 
        }}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
        Уже с нами? <Link to="/login" style={{ color: '#d4af37', textDecoration: 'none' }}>Войти в аккаунт</Link>
      </p>
    </div>
  );
};