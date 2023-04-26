const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        dial: {
            type: String,
            required: true,
        },
        case: {
            type: String,
            required: true,
        },
        strap: {
            type: String,
            required: true,
        },
        funtions: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        tags: {
            type: Array,
            required: true,
        }
    },
    { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
