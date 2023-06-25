import mongoose from 'mongoose';

const employeeModel = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurants'
  },
  name: {
    type: String,
    required: true,
  },
  access: [{
    type: String,
  }],
  contact: {
    type: String,
    required: true,
    maxLenght: 12,
  },
  createdDate: Date,
  updatedDate: [String],
  isActive: {
    type: Boolean,
    default: true
  }
});