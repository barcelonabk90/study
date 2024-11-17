
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import { AppDataSource } from './config/db';

AppDataSource.initialize().then(() => {
  console.log('Database connected');
}).catch(error => console.log('Database connection error:', error));

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;
