const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already registered'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    firstName: String,
    lastName: String,
    profilePhoto: String,
    password: String,

    source: {
        type: String,
        required: [true, 'source not specified'],
    },
    lastVisited: {
        type: Date,
        default: new Date(),
    },
});

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
