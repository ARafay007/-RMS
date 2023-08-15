const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ownerModel } = require("../models/ownerModel");
const { catchAsync } = require("./catchAsync");

exports.shopRequest = catchAsync(async (req, res) => {
    const {name, cnic, contactNumber, landLineNumber, email, restaurantName, location} = req.body;
    const createdDate = Date.now();
    const data = await ownerModel.create({name, cnic, contactNumber, landLineNumber, email, restaurantName, createdDate, location});
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
    const {_id, name, role, restaurantName, categories} = user[0];
    res.status(200).json({token, user: {_id, name, role, restaurantName, categories}});
});

exports.getLoggedInUserData = catchAsync(async (req, res) => {
    const user = await ownerModel.find({_id: req.params.id, isActive: true, isRejected: false}, 
        {
            'cnic': 1, 
            'contactNumber': 1,
            'email': 1,
            'menu': 1,
            'name': 1,
            'restaurantName': 1,
            'role': 1
        });
    res.status(200).json(user);
});

exports.addMenu = catchAsync(async (req, res) => {
    const {category, items} = req.body;
    const data = await ownerModel.findOneAndUpdate({_id: req.params.ownerId}, 
        // **********************
        // menu field will contain objects and each object will contain "category" field which will be text and "items" fielld which will be an array of dish list.
        // {
        //   category: text,
        //   items: [array of item]
        // }
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
    const {category} = req.params;
    const categoryName = category.split('%20').join(' ');
    const items = data[0].menu.find(el => {if(el.category === categoryName) return el.items});
    res.status(200).json({data: items});
});

exports.getRestaurantsRelatedLocation = catchAsync(async (req, res) => {
    const restaurantNameList = await ownerModel.find({location: req.params.location, isActive: true},{"restaurantName": 1});
    res.status(200).json({restaurantNameList});
});