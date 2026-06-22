import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Импорты роутеров
import productRouter from './router/product.router';
import authRouter from './router/auth.router';
import basketRouter from './router/basket.router';
import localeRouter from './router/locale.router';
import recommendationRouter from './router/recommendation.router';
import adminRouter from './router/admin.router';

const app = express();

// 1. CORS - должен быть первым!
app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));

// 2. Стандартные мидлвары
app.use(express.json());
app.use(cookieParser());

// 3. СЕССИИ - должны быть ДО роутеров!
app.use(session({
  secret: 'l_shop_elite_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    httpOnly: true,
    sameSite: 'lax' 
  }
}));

// 4. Роуты API
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/basket', basketRouter);
app.use('/api/locale', localeRouter);
app.use('/api/recommendations', recommendationRouter);
app.use('/api/admin', adminRouter);

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'L_Shop API', version: '2.0.0' },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./src/router/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = 5000;

// Если мы НЕ запускаем тесты - слушаем порт
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 Сервер запущен: http://localhost:${PORT}`));
}

// Экспортируем app для библиотеки Supertest
export default app;