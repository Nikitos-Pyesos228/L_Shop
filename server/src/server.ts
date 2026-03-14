import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRouter from './router/product.router';
import authRouter from './router/auth.router';
import basketRouter from './router/basket.router';
import deliveryRouter from './router/delivery.router';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/basket', basketRouter);
app.use('/api/delivery', deliveryRouter);

app.get('/api/health', (req, res) => res.json({ status: 'L_Shop Online' }));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен: http://localhost:${PORT}`));