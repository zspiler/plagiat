const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

User = mongoose.model('user', UserSchema);
module.exports = User;
