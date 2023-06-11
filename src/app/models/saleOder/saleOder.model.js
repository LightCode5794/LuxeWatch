const mongoose = require('mongoose');



const saleOderSchema = new mongoose.Schema(
    {
        firstName: {
            type:  String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            reqired: true,
        },
        address: {
            type:  String,
            required: true,
        },
        address2: {
            type:  String,
        },
        productList: {
            type: [{
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                count: {
                    type: Number,
                }
            }],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,   
            ref: 'User',
        },
        totalPrice: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true },
);

const SaleOder = mongoose.model('SaleOder', saleOderSchema);

module.exports = SaleOder;
