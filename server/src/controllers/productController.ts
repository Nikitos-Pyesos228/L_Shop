import { Request, Response } from 'express';
import { JsonDB } from '../services/db.service';

// Описываем структуру продукта, чтобы не использовать any
interface IProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

// Описываем типы для Query-параметров (поиск, фильтр, сортировка)
interface ProductQuery {
  search?: string;
  category?: string;
  sort?: string;
}

export const getProducts = async (
  req: Request<{}, {}, {}, ProductQuery>, 
  res: Response
) => {
  try {
    const { search, category, sort } = req.query;

    // Читаем данные из JSON через твой сервис
    const allProducts = await JsonDB.read<IProduct>('products'); 
    
    let results: IProduct[] = [...allProducts];

    // Фильтрация по категории (вино, виски и т.д.)
    if (category) {
      results = results.filter((p: IProduct) => p.category === category);
    }

    // Поиск по названию или описанию (регистронезависимый)
    if (search) {
      const query = search.toLowerCase();
      results = results.filter((p: IProduct) => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Сортировка по цене
    if (sort === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    }

    res.json(results);
  } catch (error) {
    console.error('Ошибка в ProductController:', error);
    res.status(500).json({ message: "Ошибка сервера при получении товаров" });
  }
};