
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
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
            type: String
        },
    ],
    baseFiles: [
        {
            type: String
        }
    ],
    results: [
        {
            file1: String,
            file1Percentage: Number,
            file2: String,
            file2Percentage: Number,
            linesMatched: Number
        }
    ],
    date: {
        type: String
    }
});

Test = mongoose.model('test', TestSchema);
module.exports = Test;

