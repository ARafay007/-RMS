const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

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
      //   items: [array of item]
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

ownerSchema.pre('save', async function(next){
  if(!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

ownerSchema.methods.correctPassword = async function(candidatePassword, encryptedPassword){
  return await bcrypt.compare(candidatePassword, encryptedPassword);
};

exports.ownerModel = mongoose.model('owners', ownerSchema);

