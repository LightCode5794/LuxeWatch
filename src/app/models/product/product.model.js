const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

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
            slug: 'name',
            unique: true,
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
        code: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,

        },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],

        // funtions: {
        //     type: String,
        //     required: true,
        // },
        thumbnail: {
            type: String,
            required: true,
        },

        images: {
            type: Array,
           // required: true,
        },

    },
    { timestamps: true },
);

// add plugins
mongoose.plugin(slug);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
