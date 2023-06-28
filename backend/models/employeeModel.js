import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  createdDate: Date,
  updatedDate: [String],
  isActive: {
    type: Boolean,
    default: true
  }
});

export const employeeModel = mongoose.model('employees', employeeSchema);