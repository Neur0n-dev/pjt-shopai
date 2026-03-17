import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './common/errorHandler';
import { swaggerSpec } from './common/swagger';
import addressRouter from './modules/address/address.route';
import authRouter from './modules/auth/auth.route';
import categoryRouter from './modules/category/category.route';
import userRouter from './modules/user/user.route';

const app = express();

// ========================
// CORS
// ========================
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
);

// ========================
// Logger
// ========================
const devFormat = ':method :url | :status | :response-time ms';
const prodFormat = ':date[iso] | :method :url | :status | :response-time ms | :remote-addr';

app.use(morgan(process.env.NODE_ENV === 'prod' ? prodFormat : devFormat));

// ========================
// Body Parser
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// Swagger
// ========================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========================
// Routes
// ========================
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/categories', categoryRouter);

// ========================
// Error Handler
// ========================
app.use(errorHandler);

export default app;
