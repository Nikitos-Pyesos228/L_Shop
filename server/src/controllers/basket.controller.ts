import { Response } from 'express';
import { JsonDB } from '../services/db.service';

export const addToBasket = async (req: any, res: Response) => {
  try {
    const { productId, count } = req.body;
    const user = req.session.user; // Берем из сессии!

    if (!user) return res.status(401).json({ message: 'Войдите!' });

    const baskets = await JsonDB.read<any>('baskets');
    let userBasket = baskets.find((b: any) => b.userId === user.id);

    if (!userBasket) {
      userBasket = { userId: user.id, items: [] };
      baskets.push(userBasket);
    }

    const item = userBasket.items.find((i: any) => i.productId === productId);
    if (item) item.count += count;
    else userBasket.items.push({ productId, count });

    await JsonDB.write('baskets', baskets);
    res.json(userBasket);
  } catch (e) {
    res.status(500).json({ message: 'Ошибка корзины' });
  }
};

// Добавь пустые функции, если они у тебя были в роутере, чтобы не падало
export const getBasket = async (req: any, res: Response) => {
    const user = req.session.user;
    if (!user) return res.status(401).send();
    const baskets = await JsonDB.read<any>('baskets');
    res.json(baskets.find((b: any) => b.userId === user.id) || { items: [] });
};