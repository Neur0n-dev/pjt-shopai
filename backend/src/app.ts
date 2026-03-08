import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './common/errorHandler';

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
// Error Handler
// ========================
app.use(errorHandler);

export default app;
