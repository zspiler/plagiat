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
    events: {
        type: Array,
        required: true
    },
    events: [
        {
            event: {
                type: Schema.Types.ObjectId,
                ref: 'events'
            }
        }
    ],
});

User = mongoose.model('user', UserSchema);
module.exports = User;
