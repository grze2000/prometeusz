const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');
//const csvtojson = require('csvtojson');
const AdmZip = require('adm-zip');

const Face = require('../models/Face');
const Info = require('../models/Info');
const Person = require('../models/Person');
const Photo = require('../models/Photo');
const User = require('../models/User');

const exportCollection = (collection, name) => {
    return new Promise((resolve, reject) => {
        collection.find({}, (err, data) => {
            if(err) reject(err);
            const json2csvParser = new Json2csvParser({ header: true });
            const csv = json2csvParser.parse(data.map(x => x.toObject()));
            resolve({name: name, content: csv});
        });
    });
}

exports.importData = (req, res) => {
    
}

exports.importPhotos = (req, res) => {

}

exports.exportData = (req, res) => {
    Promise.all([
        exportCollection(Face, 'face'),
        exportCollection(Person, 'person'),
        exportCollection(Photo, 'photo'),
        exportCollection(User, 'user'),
        //exportCollection(Info, 'info'),
    ]).then(values => {
        let zip = new AdmZip();
        values.forEach(file => {
            zip.addFile(`${file.name}.csv`, Buffer.alloc(file.content.length, file.content));
        });
        zip.writeZip('files/export/data.zip');
        res.json({file: 'files/export/data.zip'});
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: 'Nie można wyeksportować danych'});
    });
}

exports.exportPhotos = (req, res) => {

}