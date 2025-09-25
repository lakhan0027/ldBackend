// backend/server.ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger middleware: logs every incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', userRoutes);

// 404 handler
app.use((req, res) => {
  console.warn(`[${new Date().toISOString()}] 404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
