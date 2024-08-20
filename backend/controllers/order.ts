import { Request, Response } from 'express';
import { catchAsync, AppError } from '../utils/';
import { orderModel } from '../models/order';

export class OrderController{
  newOrder = catchAsync(async (req: Request, res: Response) => {
    const { name, contact, address, restaurantName, restaurantRef, itemList, createdDate } = req.body;

    const data = await orderModel.create({ name, contact, address, restaurantName, restaurantRef, itemList, createdDate });
    res.status(200).json({ data });
  });

  dispatchOrder = catchAsync(async (req: Request, res: Response) => {
    const {employeeRef} = req.body;
    const data = await orderModel.findByIdAndUpdate(req.params.id, { employeeRef, isDispatch: true }, { new: true });
    res.status(200).json({ data });
  });

  cancelOrder = catchAsync(async (req: Request, res: Response) => {
    const data = await orderModel.findByIdAndUpdate(req.params.id, { cancelOrder: true }, { new: true });
    res.status(200).json({ data });
  });
}