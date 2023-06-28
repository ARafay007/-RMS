const { ownerModel } = required("../models/ownerModel");
const { catchAsync } = required("./catchAsync");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.email,
        pass: process.env.emailPassword
    }
})

export const getAllShopRequests = catchAsync(async (req, res) => {
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

export const createRestaurant = catchAsync(async (req, res) => {
    const data = await ownerModel.findOneAndUpdate({id: req.params.ownerId}, {isActive: true}, {returnNewDocument: true});

    const shopPasswordLength = 8, charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = '';

    // This will create random 8 charaters long password
    for(const i=0, n=charset.length; i<shopPasswordLength; i++){
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.email,
            pass: process.env.emailPassword
        }
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: `<h1>PASSWORD: ${password}</h1>`
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) throw Error(error); 
        else console.log('Email sent: ' + info.response);
    });

    res.status(200).json({data});
});