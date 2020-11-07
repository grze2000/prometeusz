const Json2csvParser = require('json2csv').Parser;
const csv = require('csvtojson');
const AdmZip = require('adm-zip');

const Face = require('../models/Face');
const Info = require('../models/Info');
const Person = require('../models/Person');
const Photo = require('../models/Photo');
const User = require('../models/User');

const models = {
    'face': Face,
    'info': Info,
    'person': Person,
    'photo': Photo,
    'user': User
};

const validateFiles = fileTypes => (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message: 'Nie przesłano pliku!'});
    }
    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
    if(files.some(file => !fileTypes.test(file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase()))) {
        return res.status(400).json({message: 'Nieprawidłowy format pliku!'});
    }
    next();
}

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

exports.importData = [validateFiles(/csv/), (req, res) => {
    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
    files.forEach(file => {
        const filename = /(.+)\..+/g.exec(file.name);
        if(!filename || !(filename[1].toLowerCase() in models)) {
            return res.status(400).json({message: `Plik ${file.name} nie jest poprawnym eksportem kolekcji!`});
        }
        csv().fromString(files[0].data.toString('utf8')).then(json => {
            models[filename[1]].insertMany(json, err => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({message: 'Nie można zaimportować kolekcji!'});
                }
                res.sendStatus(201);
            })
        });
    })
}]

exports.importPhotos = [validateFiles(/zip/), (req, res) => {
    /*req.files.files.mv(`./files/tmp/${req.files.files.name}`, err => {
        if(err) {
            return res.status(500).json({message: 'Nie można zapisać pliku!'});
        }
        res.sendStatus(201);
    });*/
}]

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