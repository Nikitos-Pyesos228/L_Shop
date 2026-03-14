import React, { useEffect, useState } from 'react';
import { api } from '../../api/instance';
import { Link } from 'react-router-dom';

export const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBasket = async () => {
    try {
      const { data } = await api.get('/basket');
      setBasket(data);
    } catch (err) {
      console.log("Нужна авторизация");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  if (loading) return <div style={{ padding: '50px', color: '#d4af37' }}>Загрузка коллекции...</div>;

  if (!basket || !basket.items || basket.items.length === 0) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37' }}>Ваша корзина пуста</h2>
        <p style={{ color: '#888' }}>Самое время пополнить свои запасы элитного алкоголя.</p>
        <Link to="/catalog" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}>Перейти в каталог →</Link>
      </div>
    );
  }

  const totalPrice = basket.items.reduce((sum: number, item: any) => sum + (item.product.price * item.count), 0);

  return (
    <div style={{ padding: '50px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ color: '#d4af37', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
        Ваш заказ
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {basket.items.map((item: any) => (
          <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', background: '#222', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
            <img src={item.product.image} style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '20px' }} alt="" />
            <div style={{ flex: 1 }}>
              <h4 data-title="basket" style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{item.product.title}</h4>
              <span style={{ color: '#888' }}>Количество: {item.count} шт.</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong data-price="basket" style={{ color: '#d4af37', fontSize: '20px' }}>${item.product.price * item.count}</strong>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#111', borderRadius: '12px', border: '1px solid #d4af37', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#888', display: 'block' }}>Итого к оплате:</span>
          <strong style={{ fontSize: '28px', color: '#d4af37' }}>${totalPrice}</strong>
        </div>
        <Link to="/delivery" style={{ background: '#d4af37', color: '#000', padding: '15px 35px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
          ОФОРМИТЬ ДОСТАВКУ
        </Link>
      </div>
    </div>
  );
};