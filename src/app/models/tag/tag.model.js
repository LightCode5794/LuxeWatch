const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

tagSchema.indexes({'$**': 'text'});
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
