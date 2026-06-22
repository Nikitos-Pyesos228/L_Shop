import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRouter from './router/product.router';
import authRouter from './router/auth.router';
import basketRouter from './router/basket.router';
import deliveryRouter from './router/delivery.router';

const app = express();


// Настройка Swagger для TypeScript
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'L_Shop API',
      version: '1.0.0',
      description: 'Документация API для интернет-магазина L_Shop',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Убедитесь, что тут указан порт вашего сервера (например, 5000 или тот, который прописан ниже в server.ts)
      },
    ],
  },
  // Указываем Swagger искать документацию во всех файлах .ts в корне сервера и в папке src
  apis: ['./*.ts', './src/**/*.ts'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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