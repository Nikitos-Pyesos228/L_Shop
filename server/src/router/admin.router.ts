import { Router } from 'express';
import { JsonDB } from '../services/db.service';

const router = Router();

const checkHost = (req: any, res: any, next: any) => {
  if (req.session?.user?.role !== 'host') {
    return res.status(403).json({ message: "Доступ запрещен: Вы не Хозяин" });
  }
  next();
};

router.post('/products', checkHost, async (req, res) => {
  const products = await JsonDB.read<any>('products');
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  await JsonDB.write('products', products);
  res.json(newProduct);
});

router.put('/products/:id', checkHost, async (req, res) => {
  const products = await JsonDB.read<any>('products');
  const index = products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    await JsonDB.write('products', products);
    return res.json(products[index]);
  }
  res.status(404).send('Not found');
});

export default router; // ВАЖНО