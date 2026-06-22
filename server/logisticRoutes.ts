import { Router } from 'express';
import { getBasket, updateBasket, checkoutOrder } from '../controllers/logisticController';
import { authMiddleware } from '../middleware/authMiddleware'; // Middleware Тимлида

const router = Router();

/**
 * @swagger
 * /api/basket:
 *   get:
 *     summary: Получить содержимое корзины пользователя
 *     description: Возвращает список товаров, добавленных в корзину текущего авторизованного пользователя.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает объект корзины.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "user123"
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: "prod99"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *       401:
 *         description: Не авторизован. Токен отсутствует или невалиден.
 */
router.get('/basket', authMiddleware, getBasket);

/**
 * @swagger
 * /api/basket:
 *   post:
 *     summary: Обновить содержимое корзины (добавление, изменение количества, удаление)
 *     description: Перезаписывает массив элементов корзины пользователя. Используется для добавления товара, изменения его количества или удаления.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "prod99"
 *                     quantity:
 *                       type: integer
 *                       example: 3
 *     responses:
 *       200:
 *         description: Корзина успешно обновлена. Возвращает обновленный объект корзины.
 *       401:
 *         description: Не авторизован.
 */
router.post('/basket', authMiddleware, updateBasket); // Добавление/изменение кол-ва/удаление (перезапись массива)

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Оформить заказ из корзины (Checkout)
 *     description: Создает заказ на основе текущей корзины пользователя и очищает её.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Заказ успешно оформлен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Заказ успешно оформлен"
 *                 orderId:
 *                   type: string
 *                   example: "order777"
 *       400:
 *         description: Ошибка оформления заказа (например, пустая корзина).
 *       401:
 *         description: Не авторизован.
 */
router.post('/checkout', authMiddleware, checkoutOrder);

export default router;