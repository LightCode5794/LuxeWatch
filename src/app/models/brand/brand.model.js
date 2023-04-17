
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        // description: {
        //     type: String
        // },
        imgUrl:
        {
           type: String,
           required: true,
        },
        cloudinary_id: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
