import { Router } from 'express';
import { createOrder } from '../controllers/delivery.controller';

const router = Router();

router.post('/', createOrder);

export default router;