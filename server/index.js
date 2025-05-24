import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 1975;
try {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
  console.error('Server failed to start:', err.message);
}
