import React, { useState } from 'react';
import { api } from '../../api/instance';
import { useNavigate } from 'react-router-dom';

export const DeliveryPage: React.FC = () => {
  const [form, setForm] = useState({ address: '', phone: '', email: '', paymentMethod: 'card' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/delivery', form);
      alert('Ваша элитная посылка уже в пути!');
      navigate('/catalog');
    } catch (err) {
      alert('Ошибка при оформлении. Проверьте корзину или авторизацию.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', background: '#222', borderRadius: '12px', border: '1px solid #d4af37' }}>
      <h2 style={{ color: '#d4af37', textAlign: 'center' }}>Данные для доставки</h2>
      <form data-delivery onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input placeholder="Адрес доставки (Страна, Город, Улица...)" onChange={e => setForm({...form, address: e.target.value})} required style={{padding: '12px'}} />
        <input placeholder="Телефон" type="tel" onChange={e => setForm({...form, phone: e.target.value})} required style={{padding: '12px'}} />
        <input placeholder="Email" type="email" onChange={e => setForm({...form, email: e.target.value})} required style={{padding: '12px'}} />
        
        <label style={{ color: '#888', marginTop: '10px' }}>Способ оплаты:</label>
        <select onChange={e => setForm({...form, paymentMethod: e.target.value})} style={{padding: '12px'}}>
          <option value="card">Картой на сайте</option>
          <option value="cash">Курьеру лично в руки</option>
        </select>

        <button type="submit" style={{ background: '#d4af37', padding: '15px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer', border: 'none' }}>
          ПОДТВЕРДИТЬ ЗАКАЗ
        </button>
      </form>
    </div>
  );
};