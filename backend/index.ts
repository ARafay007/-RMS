import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { orderRoutes, ownerRoutes } from './routes';
import { AppError } from './utils';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/owner', ownerRoutes);
app.use('/api/order', orderRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`could not found ${req.originalUrl} on the server!`, 404));
});

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.statusCode).json({ message: error.message });
});

const dbLink = process.env.DB?.replace('<PASSWORD>', process.env.DB_PASSWORD || '') || '';

mongoose.connect(dbLink)
.then(() => { console.log('DB connected successfuly'); })
.catch((error) => { console.log(`DB connection error 💥💥💥 ${error}`); });

app.listen(4321, () => {
  console.log('Server is listening on 4321');
});