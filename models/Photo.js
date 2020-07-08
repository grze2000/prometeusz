const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    url: String,
    people: [{
        type: Schema.Types.ObjectId, ref: 'Person'
    }],
    analyzed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Photo', PhotoSchema, 'photos');