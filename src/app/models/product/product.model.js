const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const MongooseDelete = require("mongoose-delete");

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
        code: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,

        },
        currency: {
            type: String,
        },
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],

        thumbnail: {
            path: String,
            filename: String,
        },

        images: [{ path: String, filename: String }],

    },
    { timestamps: true },
);

// add plugins
mongoose.plugin(slug);
productSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true });
productSchema.indexes({ '$**': 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
