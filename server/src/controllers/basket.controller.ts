import { Request, Response } from 'express';
import { JsonDB } from '../services/db.service';

interface IProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface IBasketItem {
  count: number;
  product: IProduct;
}

interface IBasket {
  userId: string;
  items: IBasketItem[];
}

export const addToBasket = async (req: Request, res: Response) => {
  try {
    const userId = req.cookies['session_id'];
    if (!userId) {
      return res.status(401).json({ message: 'Сначала нужно войти в аккаунт' });
    }

    const { productId, count } = req.body;
    const baskets = await JsonDB.read<IBasket>('basket');
    const products = await JsonDB.read<IProduct>('products');

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    let userBasket = baskets.find((b) => b.userId === userId);

    if (!userBasket) {
      userBasket = { userId, items: [] };
      baskets.push(userBasket);
    }

    const existingItem = userBasket.items.find((item) => item.product.id === productId);

    if (existingItem) {
      existingItem.count += (count || 1);
    } else {
      userBasket.items.push({ count: (count || 1), product });
    }

    await JsonDB.write('basket', baskets);
    res.json({ message: 'Товар добавлен в корзину', basket: userBasket });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении в корзину' });
  }
};

export const getBasket = async (req: Request, res: Response) => {
  try {
    const userId = req.cookies['session_id'];
    if (!userId) {
      return res.status(401).json({ message: 'Авторизуйтесь для доступа к корзине' });
    }

    const baskets = await JsonDB.read<IBasket>('basket');
    const userBasket = baskets.find((b) => b.userId === userId);

    res.json(userBasket || { userId, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении корзины' });
  }
};