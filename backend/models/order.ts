import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: [{
      type: String,
      required: true,
      maxlength: 12,
  }],
  address: {
      type: String,
      required: true
  },
  restaurantName: String,
  restaurantRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owners'
  },
  itemList: [{
      item: {
          type: String,
          required: true
      },
      price: {
          type: Number,
          required: true
      },
      quantity: {
          type: Number,
          required: true
      },
  }],
  employeeRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees'
  },
  isDispatch: {
      type: Boolean,
      default: false
  },
  createdDate: Date,
  updatedDate: [String],
  cancelOrder: {
    type: Boolean,
    default: false
  },
  isActive: {
      type: Boolean,
      default: true
  }
});

export const orderModel = model('orders', orderSchema);