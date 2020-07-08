const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    infoType: {
        type: String,
        required: true
    },
    message: String
});

module.exports = mongoose.model('Info', InfoSchema, 'info');