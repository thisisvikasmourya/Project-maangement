import dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import userRoutes from './routes/user.routes';

dotenv.config();
 connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

export default app;
