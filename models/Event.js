const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        required: true
    },
    files: [
        {
            file: {
                type: String
            }
        }
    ],
    baseFiles: [
        {
            file: {
                type: String
            }
        }
    ],
    language: {
        type: String,
        required: true
    },
    results: {
        type: Object,
        required: false
    }
});

Event = mongoose.model('event', EventSchema);
module.exports = User;
