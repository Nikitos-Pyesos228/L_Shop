import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/instance';

interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = Object.fromEntries(searchParams);
        const { data } = await api.get('/products', { params });
        setProducts(data);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const addToBasket = async (productId: string) => {
    try {
      await api.post('/basket/add', { productId, count: 1 });
      alert('Бутылка добавлена в вашу коллекцию!');
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert('Для покупки элитного алкоголя нужно авторизоваться');
      } else {
        alert('Ошибка при добавлении в корзину');
      }
    }
  };

  return (
    <div style={{ padding: '40px 50px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
        <h2 style={{ color: '#d4af37', margin: 0 }}>Коллекция элитных напитков</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input 
            placeholder="Поиск..." 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff' }}
            onChange={(e) => {
              if (e.target.value) searchParams.set('search', e.target.value);
              else searchParams.delete('search');
              setSearchParams(searchParams);
            }} 
          />
          <select 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff' }}
            onChange={(e) => {
              searchParams.set('category', e.target.value);
              setSearchParams(searchParams);
            }}
          >
            <option value="">Все категории</option>
            <option value="whiskey">Виски</option>
            <option value="wine">Вино</option>
            <option value="cognac">Коньяк</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
        {products.map(p => (
          <div key={p.id} style={{ background: '#222', padding: '20px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center' }}>
            <img src={p.image} style={{ width: '100%', height: '220px', objectFit: 'contain', marginBottom: '15px' }} alt={p.title} />
            <h3 data-title={p.title} style={{ margin: '0 0 10px 0', color: '#fff' }}>{p.title}</h3>
            <p style={{ fontSize: '14px', color: '#888', height: '40px', overflow: 'hidden', marginBottom: '15px' }}>{p.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <strong data-price={p.price} style={{ color: '#d4af37', fontSize: '20px' }}>${p.price}</strong>
              <button 
                onClick={() => addToBasket(p.id)}
                style={{ background: '#d4af37', border: 'none', padding: '10px 18px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', color: '#000' }}
              >
                В КОРЗИНУ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};