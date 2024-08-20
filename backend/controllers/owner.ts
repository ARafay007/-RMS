import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { catchAsync, AppError } from '../utils/';
import { ownerModel } from '../models/owner';


export class OwnerController{
  shopLogin = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(!email || !password){
      throw new AppError('Username and password are required!', 400);
    }

    const shopInfo = await ownerModel.find({email, isRejected: false}).select('password');

    if(!shopInfo || !(await bcrypt.compare(password, shopInfo[0].password || ''))){
      throw new AppError('Incorrect email or password', 404);
    }

    jwt.sign({id: shopInfo[0]._id}, process.env.JWT_SECRET || '', { expiresIn: process.env.JWT_EXPIRES_IN }, (error: any, token: any) => {
      if(error) throw new AppError(error, 400);

      res.status(200).json({
        data: {
          token: token,
          id: shopInfo[0]._id
        }
      });
    });
  });

  getRestaurantsList = catchAsync(async (req: Request, res: Response) => {
    const data = await ownerModel.find().select({_id: 1, restaurantName: 1});
    res.status(200).json({ data });
  });

  getRestaurantData = catchAsync(async (req: Request, res: Response) => {
    const data = await ownerModel.find({_id: req.params.id});
    res.status(200).json({ data });
  });

  getLoggedInUserData = catchAsync(async (req: Request, res: Response) => {
    const data = await ownerModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id)} },
      {
        $project: {
          'cnic': 1,
          'contactNumber': 1,
          'email': 1,
          'name': 1,
          'restaurantName': 1,
          'role': 1,
          'menu': {
            $filter: {
              input: '$menu',
              as: 'menuItem',
              cond: { $eq: [ '$$menuItem.isActive', true ] }
            }
          },
        }
      }
    ]);
    res.status(200).json({ data });
  });

  createCategory = catchAsync(async (req: Request, res: Response) => {
    type menuDataStructure = {
      category: string;
      items: [
        {
          item: string,
          price: number,
          imgURL: string,
        }
      ];
      isActive: boolean
    }

    const { category, items } : menuDataStructure = req.body;

    const data = await ownerModel.findByIdAndUpdate(req.params.id, 
      { $push: { menu: { category, items } } }, 
      { new: true }
    );

      res.status(200).json({ data });
  });

  addMoreItemsInCategory = catchAsync(async (req: Request, res: Response) => {
    type itemsDataStructure = {
      menuIndex: number;
      items: [
        {
          item: string,
          price: number,
          imgURL: string,
        }
      ]
    }

    const {items, menuIndex}: itemsDataStructure = req.body;

    const data = await ownerModel.findByIdAndUpdate(req.params.id, 
      { $push: { [`menu.[${menuIndex}].items`]: {$each: items} } },
      { new: true });

    res.status(200).json({ data });
  });

  updateMenuItemNameAndPrice = catchAsync(async (req: Request, res: Response) => {
    type itemsDataStructure = {
      menuIndex: number;
      itemsIndex: number;
      item: {
        item: string,
        price: number,
        imgURL: number,
      }
    }
    const { menuIndex, itemsIndex, item }: itemsDataStructure = req.body;

    const data = await ownerModel.findByIdAndUpdate(req.params.id, 
      { [`menu.${menuIndex}.items.${itemsIndex}`]: item },
      { new: true }
    );

    res.status(200).json({ data });
  });

  deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { menuIndex } : { menuIndex: number } = req.body;

    const data = await ownerModel.findByIdAndUpdate(req.params.id, 
      { [`menu.[${menuIndex}].isActive`]: false }, 
      { new: true }
    );

    res.status(200).json({ data: 'Category deleted successfuly.' });
  });

  deleteItem = catchAsync(async (req: Request, res: Response) => {
    type itemDataStucture = {
      menuIndex: number;
      items: [
        {
          item: string,
          price: number,
          imgURL: string
        }
      ]
    }
    const { menuIndex, items }: itemDataStucture = req.body;

    const data = await ownerModel.findByIdAndUpdate(req.params.id, 
      { [`menu.[${menuIndex}].items`]: items },
      { new: true }
    );

    res.status(200).json({ data });
  });
}