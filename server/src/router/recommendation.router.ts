import { Router } from 'express';
import { JsonDB } from '../services/db.service'; 

const router = Router();

router.post('/hit/:productId', async (req: any, res) => {
  const { productId } = req.params;
  const products = await JsonDB.read<any>('products');
  const product = products.find(p => p.id == productId);

  if (product) {
    if (!req.session.interests) req.session.interests = [];
    const updatedInterests = [...new Set([...req.session.interests, ...product.tags])];
    req.session.interests = updatedInterests;
    req.session.interestsExpires = Date.now() + 5 * 60 * 1000; // 5 минут
  }
  res.sendStatus(200);
});

router.get('/', async (req: any, res) => {
  const products = await JsonDB.read<any>('products');
  if (req.session.interestsExpires && Date.now() > req.session.interestsExpires) {
    req.session.interests = [];
  }

  const userInterests = req.session.interests || [];
  if (userInterests.length === 0) return res.json(products);

  const sorted = [...products].sort((a, b) => {
    const aM = a.tags?.filter((t: string) => userInterests.includes(t)).length || 0;
    const bM = b.tags?.filter((t: string) => userInterests.includes(t)).length || 0;
    return bM - aM;
  });

  res.json(sorted);
});

export default router; // ВАЖНО