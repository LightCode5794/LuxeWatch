const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
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
        slug: {
            type: String,
            required: true,
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
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
          
        currency: {
            type: String,
        },
        sku: {
            type: String,
            required: true,
        },
        tags: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
        
        // funtions: {
        //     type: String,
        //     required: true,
        // },
      
        images: {
            type: Array,

        },
       
    },
    { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
