import { Router } from 'express';
import { getProducts } from '../controllers/productController';

const router = Router();

// Этот роут будет доступен по пути /api/products/
router.get('/', getProducts);

export default router;