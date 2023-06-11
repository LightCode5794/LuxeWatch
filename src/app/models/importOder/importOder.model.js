const mongoose = require('mongoose');




const importOderSchema = new mongoose.Schema(
    {
        product: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        unitPrice: {
            type: Number,
            reqired: true,
        },
    },
    { timestamps: true },
);

const ImportOder = mongoose.model('ImportOder', importOderSchema);

module.exports = ImportOder;
