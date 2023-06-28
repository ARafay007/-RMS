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
    const data = ownerModel.find({email, password, isActive: true, isRejected: false});
    res.status(200).json({data: 'good to go!'});
});