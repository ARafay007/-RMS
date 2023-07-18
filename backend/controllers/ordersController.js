const {orderModel} = require('../models/orderModel');
const {catchAsync} = require('./catchAsync');

exports.addOrder = catchAsync(async (req, res) => {
    const data = await orderModel.insertMany(req.body);
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