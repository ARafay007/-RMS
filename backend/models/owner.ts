import { Schema, model } from "mongoose";
import validator from 'validator';

const ownerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
    maxlength: 15,
  },
  contactNumber: {
    type: String,
    required: true,
    maxlength: 12,
  },
  landLineNumber: {
    type: String,
    maxlength: 10
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email.']
  },
  restaurantName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  menu: [
    // **********************
      // menu field will contain objects and each object will contain "category" field which will be text and "items" fielld which will be an array of dish list.
      // {
      //   category: text,
      //   items: [
      //    {
      //      item: string,
      //      price: number,
      //      imgURL: string
      //      isActive: boolean
      //    }
      //   ],
      //  isActive: boolean
      // }

    // **********************
    // type: Map,
    // of: [{
    //   item: String,
    //   price: Number
    // }]
  ],
  role: {
    type: String, 
    default: 'owner'
  },
  password: {
    type: String,
    maxlength: 8,
    select: false,
  },
  createdDate: Date,
  updatedDate: [String],
  isActive: {
    type: Boolean,
    default: false
  },
  isRejected: {
    type: Boolean,
    default: false
  }
});

export const ownerModel = model('owners', ownerSchema);