const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tests: [
        {
            type: Schema.Types.ObjectId,
            ref: 'test'
        }
    ],
});

User = mongoose.model('user', UserSchema);
module.exports = User;
