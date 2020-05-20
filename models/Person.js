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
    hometown: String,
    address: {
        city: String,
        postalCode: String,
        streetName: String,
        buildingNumber: String,
        country: {
            type: String,
            default: 'Polska'
        },
        maritalStatus: String
    },
    facebokID: String,
    website: String,
    phone: Number,
    email: String
});

module.exports = mongoose.model('Person', PersonSchema, 'people');