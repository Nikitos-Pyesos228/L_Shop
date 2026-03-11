import { Request, Response } from 'express';
import { JsonDB } from '../services/JsonDB';

interface ProductQuery {
  search?: string;
  category?: string;
  sort?: string;
}

interface IProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

export const getProducts = async (
  req: Request<{}, {}, {}, ProductQuery>,
  res: Response
) => {
  try {
    const { search, category, sort } = req.query;
    const allProducts = await JsonDB.read<IProductData[]>('products.json'); 
    let results = [...allProducts];

    if (category) {
      results = results.filter(p => p.category === category);
    }

    if (search) {
      const query = search.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    if (sort === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};