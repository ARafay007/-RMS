const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
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
    required: true
  },
  restaurantName: {
    type: String,
    required: true,
  },
  menu: [
    // type: Map,
    // of: [{
    //   item: String,
    //   price: Number
    // }]
  ],
  password: String,
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

exports.ownerModel = mongoose.model('owners', ownerSchema);

