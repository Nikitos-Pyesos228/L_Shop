import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CheckoutForm {
    address: string;
    phone: string;
    paymentMethod: string;
}

export const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<CheckoutForm>({ address: '', phone: '', paymentMethod: 'cash' });
    
    // Простая капча
    const [captchaNum1] = useState<number>(Math.floor(Math.random() * 10));
    const [captchaNum2] = useState<number>(Math.floor(Math.random() * 10));
    const [captchaAnswer, setCaptchaAnswer] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (parseInt(captchaAnswer) !== captchaNum1 + captchaNum2) {
            setError('Неверная капча! Вы бот?');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/checkout', form, { withCredentials: true });
            alert('Алкоголь в пути! Корзина очищена.');
            navigate('/'); // Перебрасываем на главную
        } catch (err) {
            setError('Ошибка при оформлении заказа. Возможно корзина пуста.');
        }
    };

    return (
        <div>
            <h2>Оформление доставки</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Адрес доставки:</label>
                    <input 
                        type="text" 
                        name="address" 
                        required 
                        data-delivery-address // Атрибут для теста
                        value={form.address} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Телефон:</label>
                    <input 
                        type="text" 
                        name="phone" 
                        required 
                        data-delivery-phone // Атрибут для теста
                        value={form.phone} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Способ оплаты:</label>
                    <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} data-delivery-payment>
                        <option value="cash">Наличными курьеру</option>
                        <option value="card">Картой курьеру</option>
                    </select>
                </div>

                {/* КАПЧА */}
                <div style={{ background: '#eee', padding: '10px', marginTop: '10px' }}>
                    <p>Проверка на робота: Сколько будет {captchaNum1} + {captchaNum2}?</p>
                    <input 
                        type="number" 
                        required 
                        value={captchaAnswer} 
                        onChange={(e) => setCaptchaAnswer(e.target.value)} 
                    />
                </div>

                <button type="submit" style={{ marginTop: '15px' }} data-delivery-submit>
                    Подтвердить заказ
                </button>
            </form>
        </div>
    );
};