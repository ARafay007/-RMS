const { ownerModel } = require("../models/ownerModel");
const { catchAsync } = require("./catchAsync");
const nodemailer = require('nodemailer');

exports.getAllShopRequests = catchAsync(async (req, res) => {
    const data = await ownerModel.find({
        isActive: false, 
        isRejected: false, 
        "$expr": { 
            "$eq": [
                {"$month": "$createdDate"}, 
                req.params.month
            ] 
        }});
    res.status(200).json({data});
});

exports.createRestaurant = catchAsync(async (req, res) => {
    const shopPasswordLength = 8, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = '';

    // This will create random 8 charaters long password
    for(let i=0, n=charset.length; i<shopPasswordLength; i++){
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    // const data = await ownerModel.findOneAndUpdate({_id: req.params.ownerId}, {isActive: true, password, menu: {}}, {new: true});
    const data = await ownerModel.findById(req.params.ownerId) //{isActive: true, password, menu: {}}, {new: true});
    data.isActive = true;
    data.password = '12345678';
    data.menu = [];

    await data.save();
    // const transporter = nodemailer.createTransport({
    //     service: 'outlook',
    //     auth: {
    //         user: process.env.email,
    //         pass: process.env.emailPassword
    //     }
    // });

    // const mailOptions = {
    //     from: 'youremail@gmail.com',
    //     to: 'myfriend@yahoo.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!',
    //     html: `<h1>PASSWORD: ${password}</h1>`
    //   };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if(error) throw Error(error); 
    //     else console.log('Email sent: ' + info.response);
    // });

    res.status(200).json({data});
});