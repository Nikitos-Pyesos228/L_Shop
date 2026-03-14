import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes'; 

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Роуты
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'L_Shop Backend Online' }));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));