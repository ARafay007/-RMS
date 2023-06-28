import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    name: String,
    contact: [{
        type: String,
        required: true,
        maxlength: 12,
    }],
    address: {
        type: String,
        required: true
    },
    restaurants: [{
        name: String,
        itemList: [{
            item: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }]
    }],
    createdDate: Date,
    updatedDate: [String],
    isActive: {
        type: Boolean,
        default: true
    }
});

export const orderModel = mongoose.model('Orders', ordersSchema);