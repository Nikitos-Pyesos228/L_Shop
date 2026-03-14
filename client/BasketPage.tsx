import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface BasketItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
}

export const BasketPage: React.FC = () => {
    const [basket, setBasket] = useState<BasketItem[]>([]);

    useEffect(() => {
        fetchBasket();
    }, []);

    const fetchBasket = async () => {
        const { data } = await axios.get<BasketItem[]>('http://localhost:5000/api/basket', { withCredentials: true });
        setBasket(data);
    };

    const updateBasketOnServer = async (newBasket: BasketItem[]) => {
        setBasket(newBasket);
        await axios.post('http://localhost:5000/api/basket', newBasket, { withCredentials: true });
    };

    const changeQuantity = (id: string, delta: number) => {
        const newBasket = basket.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        updateBasketOnServer(newBasket);
    };

    const removeItem = (id: string) => {
        const newBasket = basket.filter(item => item.id !== id);
        updateBasketOnServer(newBasket);
    };

    const totalPrice = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Ваша Корзина</h2>
            {basket.length === 0 ? <p>Корзина пуста</p> : (
                <>
                    {basket.map(item => (
                        <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                            {/* Атрибуты для тестов препода */}
                            <h3 data-title="basket">{item.title}</h3>
                            <p data-price="basket">Цена: {item.price} руб.</p>
                            
                            <p>Количество: {item.quantity}</p>
                            <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                            <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                            <button onClick={() => removeItem(item.id)}>Удалить</button>
                        </div>
                    ))}
                    <h3>Итого: {totalPrice} руб.</h3>
                    {/* Переход без перезагрузки (SPA) */}
                    <Link to="/checkout">
                        <button>Перейти к оформлению доставки</button>
                    </Link>
                </>
            )}
        </div>
    );
};