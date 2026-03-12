import { Router } from 'express';
import { getBasket, updateBasket, checkoutOrder } from '../controllers/logisticController';
import { authMiddleware } from '../middleware/authMiddleware'; // Middleware Тимлида

const router = Router();

// Вешаем authMiddleware на все роуты логиста!
router.get('/basket', authMiddleware, getBasket);
router.post('/basket', authMiddleware, updateBasket); // Добавление/изменение кол-ва/удаление (перезапись массива)
router.post('/checkout', authMiddleware, checkoutOrder);

export default router;