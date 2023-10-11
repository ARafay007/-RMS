const {orderModel} = require('../models/orderModel');
const {catchAsync} = require('./catchAsync');

exports.newOrder = catchAsync(async (req, res) => {
    const { name, contact, address, restaurantName, restaurantRef, itemList } = req.body;
    const createdDate = Date.now();
    const data = await orderModel.insertMany({name, contact, address, restaurantName, restaurantRef, itemList, createdDate});
    res.status(200).json({data});
});

exports.dispatchOrder = catchAsync(async (req, res) => {
    const {employeeRef} = req.body;
    const data = await orderModel.findOneAndUpdate({_id: req.params.orderId}, {employeeRef, isDispatch: true}, {new: true});
    res.status(200).json({data: true});
});

exports.dropOrder = catchAsync(async (req, res) => {
    const data = await orderModel.findOneAndUpdate({_id: req.params.orderId}, {isActive: false});
    res.status(200).json({data: true});
});