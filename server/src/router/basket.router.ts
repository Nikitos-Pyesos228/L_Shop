import { Router } from 'express';
import { addToBasket, getBasket } from '../controllers/basket.controller';

const router = Router();

router.post('/add', addToBasket);
router.get('/', getBasket);

export default router;