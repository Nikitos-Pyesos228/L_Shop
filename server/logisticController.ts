import { Request, Response } from 'express';
import { JsonDB } from '../services/JsonDB'; // Сервис Тимлида
import { BasketItem, DeliveryOrder } from '../types/logistic.types';

// Инициализируем БД
const basketDB = new JsonDB('basket.json');
const deliveryDB = new JsonDB('delivery.json');

export const getBasket = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Берем ID юзера из middleware
        const userBasket: BasketItem[] = await basketDB.read(userId) || [];
        res.status(200).json(userBasket);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка получения корзины' });
    }
};

export const updateBasket = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const newBasket: BasketItem[] = req.body; // Ожидаем массив BasketItem
        await basketDB.write(userId, newBasket);
        res.status(200).json(newBasket);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка обновления корзины' });
    }
};

export const checkoutOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const { address, phone, paymentMethod } = req.body;

        const userBasket: BasketItem[] = await basketDB.read(userId) || [];
        
        if (userBasket.length === 0) {
            res.status(400).json({ message: 'Корзина пуста' });
            return;
        }

        const totalPrice = userBasket.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const newOrder: DeliveryOrder = {
            orderId: Date.now().toString(),
            userId,
            address,
            phone,
            paymentMethod,
            items: userBasket,
            totalPrice,
            createdAt: new Date().toISOString()
        };

        // Читаем все заказы, добавляем новый, сохраняем
        const allOrders: DeliveryOrder[] = await deliveryDB.read('all') || [];
        allOrders.push(newOrder);
        await deliveryDB.write('all', allOrders);

        // ОЧИЩАЕМ КОРЗИНУ ПОСЛЕ ОФОРМЛЕНИЯ (Как в ТЗ!)
        await basketDB.write(userId, []);

        res.status(201).json({ message: 'Заказ успешно оформлен', orderId: newOrder.orderId });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка оформления заказа' });
    }
};