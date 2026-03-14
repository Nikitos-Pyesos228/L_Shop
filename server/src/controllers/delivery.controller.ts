import { Request, Response } from 'express';
import { JsonDB } from '../services/db.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.cookies['session_id'];
    if (!userId) return res.status(401).json({ message: 'Авторизуйтесь для заказа' });

    const { address, phone, email, paymentMethod } = req.body;

    // 1. Читаем корзину юзера
    const baskets = await JsonDB.read<any>('basket');
    const userBasketIndex = baskets.findIndex((b: any) => b.userId === userId);

    if (userBasketIndex === -1 || baskets[userBasketIndex].items.length === 0) {
      return res.status(400).json({ message: 'Корзина пуста' });
    }

    // 2. Создаем заказ в базе доставки
    const deliveries = await JsonDB.read<any>('delivery');
    const newOrder = {
      id: Date.now().toString(),
      userId,
      address,
      phone,
      email,
      paymentMethod,
      items: baskets[userBasketIndex].items,
      date: new Date().toISOString()
    };
    deliveries.push(newOrder);
    await JsonDB.write('delivery', deliveries);

    // 3. ОЧИЩАЕМ КОРЗИНУ (требование ТЗ 5.b)
    baskets[userBasketIndex].items = [];
    await JsonDB.write('basket', baskets);

    res.status(201).json({ message: 'Заказ успешно оформлен!', orderId: newOrder.id });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при оформлении доставки' });
  }
};