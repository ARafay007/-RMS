import { Schema, model } from "mongoose";
import validator from "validator";

const adminSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  email: {
    unique: true,
    validate: [validator.isEmail, "Provide proper email!"]
  },
  role: {
    enum: ['admin', 'owner', 'employee']
  }
});

export const adminModel = model('admins', adminSchema);