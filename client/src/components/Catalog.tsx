import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams(searchParams).toString();
        const response = await fetch(`http://localhost:5000/api/products?${query}`);
        const data: IProductData[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const updateParam = (key: string, value: string) => {
    if (value) searchParams.set(key, value);
    else searchParams.delete(key);
    setSearchParams(searchParams);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🍷 Элитный Алкоголь (Каталог)</h1>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Поиск по названию..." 
          value={search} 
          onChange={(e) => updateParam('search', e.target.value)} 
          style={{ padding: '8px' }}
        />
        <select value={category} onChange={(e) => updateParam('category', e.target.value)} style={{ padding: '8px' }}>
          <option value="">Все категории</option>
          <option value="wine">Вино</option>
          <option value="whiskey">Виски</option>
          <option value="cognac">Коньяк</option>
        </select>
        <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} style={{ padding: '8px' }}>
          <option value="">Без сортировки</option>
          <option value="price_asc">Дешевые первыми</option>
          <option value="price_desc">Дорогие первыми</option>
        </select>
      </div>

      {loading ? <p>Наливаем...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map(p => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
              <h3 data-title={p.title} style={{ fontSize: '18px', margin: '10px 0' }}>{p.title}</h3>
              <p style={{ color: '#555', fontSize: '14px' }}>{p.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ background: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{p.category}</span>
                <strong data-price={p.price} style={{ color: '#d32f2f', fontSize: '18px' }}>${p.price}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};