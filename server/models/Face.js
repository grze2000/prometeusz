const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FaceSchema = new Schema({
    url: String,
    originalImage: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }
});

module.exports = mongoose.model('Face', FaceSchema, 'faces');