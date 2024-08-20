import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { catchAsync } from '../utils/catchAsync';
import { adminModel } from '../models/admin';

export class AdminController{

  constructor(){
  }

  signIn = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userInfo = await adminModel.find({email},{_id: 0, email: 1, password: 1});

    if(userInfo[0].password){
      bcrypt.compare(password, userInfo[0].password, (error, res) => {
        if(error){
          throw new Error('password does not match');
        }

        return {data: 'Logged in!'};
      });
    }
  })
}