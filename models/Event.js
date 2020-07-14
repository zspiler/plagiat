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
    language: {
        type: String,
        required: true
    },
    files: [
        {
            path: {
                type: String
            }
        },
    ],
    baseFiles: [
        {
            path: {
                type: String
            }
        }
    ],
    results: {
        type: Object,
        required: false
    }
});

Event = mongoose.model('event', EventSchema);
module.exports = Event;
