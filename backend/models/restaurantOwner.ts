import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
  restaurantName: {
    type: String,
    required: true,
  },
  createdDate: Date,
  updatedDate: [String],
  isActive: {
    type: Boolean,
    default: true
  }
});