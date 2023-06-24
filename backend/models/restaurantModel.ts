import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  menu: {
    type: Map,
    of: [{
      item: String,
      price: Number
    }]
  },
  createdDate: Date,
  updatedDate: [String],
  isActive: {
    type: Boolean,
    default: true
  }
});

export const restaurantModel = mongoose.model('restaurants', restaurantSchema);