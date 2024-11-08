import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/task.routes.js';
import cors from 'cors';

const app = express();

// Configurar CORS para permitir solicitudes desde el frontend en Vercel con credenciales
app.use(cors({
  origin: 'https://backfront-1.onrender.com', // Reemplaza con la URL de tu frontend
  credentials: true, // Permitir cookies o credenciales
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app;
