const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname: String,
    nickname: String,
    gender: {
        type: String,
        enum: ['mężczyzna', 'kobieta'],
        required: true
    },
    birthday: Date,
    maritalStatus: String,
    address: {
        city: String,
        postalCode: String,
        streetName: String,
        buildingNumber: String,
        country: {
            type: String,
            default: 'Polska'
        },
        hometown: String
    },
    facebokID: String,
    website: String,
    phone: Number,
    email: String,
    photos: [{
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }],
    faces: [{
        type: Schema.Types.ObjectId,
        ref: 'Face'
    }]
});

module.exports = mongoose.model('Person', PersonSchema, 'people');