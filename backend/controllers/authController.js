const jwt = require('jsonwebtoken');
const {catchAsync} = require('./catchAsync');
const { ownerModel } = require("../models/ownerModel");

exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and check if it's there
  let token, decodedToken;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }

  if(!token) throw 'You are not logged in. Please log in to get access.'

  // 2.Verification token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) throw 'Your token has expired. Please log in again.';
    else decodedToken = decoded;
  });

  // 3.check if user still exist
  const freshUser = await ownerModel.find({_id: decodedToken.id, isActive: true});
  
  if(!freshUser) throw 'The token belonging to this token does no longer exist.';

  next();
});