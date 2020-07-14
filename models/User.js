const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'event'
        }
    ],
});

User = mongoose.model('user', UserSchema);
module.exports = User;
