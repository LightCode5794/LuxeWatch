const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true },
);
categorySchema.indexes({'$**': 'text'});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
