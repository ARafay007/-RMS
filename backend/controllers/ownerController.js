const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ownerModel } = require("../models/ownerModel");
const { catchAsync } = require("./catchAsync");

exports.shopRequest = catchAsync(async (req, res) => {
    const {name, cnic, contactNumber, landLineNumber, email, restaurantName} = req.body;
    const createdDate = Date.now();
    const data = await ownerModel.create({name, cnic, contactNumber, landLineNumber, email, restaurantName, createdDate});
    res.status(200).json({data});
});

exports.shopLogin = catchAsync(async (req, res) => {
    const {email, password} = req.body;

    // 1. check if email and password exist
    if(!email || !password) throw 'Please provide email or password';

    // 2. check if user exist and password is correct
    const user = await ownerModel.find({email, isActive: true, isRejected: false}).select('+password');
    const correct = await bcrypt.compare(password, user[0].password);

    if(!user || !correct) throw 'Email or password is incorrect'

    // 3. If everything okey, send token to client
    const token = jwt.sign({id: user[0]._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
    res.status(200).json({token, user});
});

exports.addMenu = catchAsync(async (req, res) => {
    const {category, items} = req.body;
    const data = await ownerModel.findOneAndUpdate({_id: req.params.ownerId}, 
        {$push: {'menu': {category, items}}},
        // this "set" aggregate will add new property in object and if the property already exist then it will update it
        // {$set: {[`menu.${category}`]: items}}, 
        {new: true}
    );

    res.status(200).json({data});
});

exports.addMoreItemsInMenu = catchAsync(async (req, res) => {
    const {items, indexNum} = req.body;

    const data = await ownerModel.findOneAndUpdate({_id: req.params.ownerId},
        {$push: {[`menu.${indexNum}.items`]: {$each: items}}},
        {new: true}
    );
    res.status(200).json({data});
});

exports.updateItemNameOrPrice = catchAsync(async (req, res) => {
    const {item, menuIndex, itemIndex} = req.body;
    const data = await ownerModel.findOneAndUpdate({_id: req.params.ownerId},
        {[`menu.[${menuIndex}].items.[${itemIndex}]`]: item},
        {new: true}  
    );
    res.status(200).json({data});
});

exports.getMenu = catchAsync(async (req, res) => {
    const data = await ownerModel.find({_id: req.params.ownerId}, {menu: 1});
    res.status(200).json({data});
});

exports.getRestaurantsRelatedLocation = catchAsync(async (req, res) => {
    const restaurantNameList = await ownerModel.find({location: req.params.location, isActive: true},{"restaurantName": 1});
    res.status(200).json({restaurantNameList});
});