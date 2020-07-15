const mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('mongoURI');

module.exports = async function () {
    try {
        await mongoose.connect(dbConfig, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected.');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
