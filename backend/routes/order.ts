import express from 'express';
import { OrderController } from '../controllers/order';

const router = express.Router();
const order = new OrderController();

router.post('/newOrder', order.newOrder);
router.patch('/dipatchOrder/:id', order.dispatchOrder);
router.patch('/cancelOrder/:id', order.cancelOrder);

export { router };