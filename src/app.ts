import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db';
import bookRoutes from './routes/bookRoutes';

dotenv.config();
 connectDB();

const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);

export default app;
