import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './common/swagger';
import { errorHandler } from './common/errorHandler';
import authRouter from './modules/auth/auth.route';
import userRouter from './modules/user/user.route';
import addressRouter from './modules/address/address.route';

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

// ========================
// Error Handler
// ========================
app.use(errorHandler);

export default app;
