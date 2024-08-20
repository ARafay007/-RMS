import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { catchAsync, AppError } from '../utils/';
import { ownerModel } from '../models/owner';

export const protect = catchAsync(async (req: Request, resp: Response, next: NextFunction) => {
  // 1. Getting token and check if it's there
  let token: string | undefined, decode: any;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token){
    return next(new AppError('You are not loggedd in! Please log in to get access', 401));
  }

  // 2. Verification token
  jwt.verify(token, process.env.JWT_SECRET || '', (error, decoded) => {
    decode = decoded;
  });

  // 3. Check if user still exist
  const user = await ownerModel.find({_id: decode.id});

  if(!user){
    next(new AppError('The token belonging to this user does no longer exist', 401));
  }
  next();
});