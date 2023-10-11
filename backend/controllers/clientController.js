const { ownerModel } = require("../models/ownerModel");
const { catchAsync } = require("./catchAsync");

exports.getMenu = catchAsync(async (req, res) => {
  const [menu] = await ownerModel.find({_id: req.params.id}, {menu: 1});
  res.status(200).json({data: menu});
});