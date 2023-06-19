const mongoose = require('mongoose');
const MongooseDelete = require("mongoose-delete");

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

// add plugins
tagSchema.plugin(MongooseDelete, { overrideMethods: 'all', deletedAt: true });
//create index to query
tagSchema.indexes({'$**': 'text'});
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
