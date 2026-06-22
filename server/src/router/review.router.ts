import { Router } from 'express';
import { JsonDB } from '../services/db.service';

const router = Router();

router.post('/:productId', async (req: any, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const user = req.session.user;

  if (!user) return res.status(401).json({ message: "Нужна регистрация" });

  const products = await JsonDB.read<any>('products');
  const index = products.findIndex(p => p.id == productId);

  if (index !== -1) {
    if (!products[index].reviews) products[index].reviews = [];
    products[index].reviews.push({
      user: user.login,
      rating: Number(rating),
      comment,
      date: new Date().toISOString()
    });
    await JsonDB.write('products', products);
    return res.json(products[index]);
  }
  res.status(404).send('Product not found');
});

export default router; // ВАЖНО