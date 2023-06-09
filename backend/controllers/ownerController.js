const { ownerModel } = require("../models/ownerModel");
const { catchAsync } = require("./catchAsync");

exports.shopRequest = catchAsync(async (req, res) => {
    const {name, cnic, contactNumber, landLineNumber, email, restaurantName} = req.body;
    const createdDate = Date.now();
    const data = await ownerModel.create({name, cnic, contactNumber, landLineNumber, email, restaurantName, createdDate});
    res.status(200).json({data});
})

exports.shopLogin = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    const data = ownerModel.find({email, password, isActive: true, isRejected: false});
    res.status(200).json({data: 'good to go!'});
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

exports.updateItemList = catchAsync(async (req, res) => {
    const {items, indexNum} = req.body;
    const data = await ownerModel.find({_id: req.params.ownerId},
        {$push: {[`menu[${indexNum}].items`]: items}},
        {new: true}
    )
});

exports.getCategoryWiseItems = catchAsync(async (req, res) => {
    const {ownerId, indexElem} = req.body;
    const data = await ownerModel.find((_id = ownerId));
});