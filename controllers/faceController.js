const Face = require('../models/Face');
const Photo = require('../models/Photo');
const Person = require('../models/Person');
const fs = require('fs');

exports.getFaces = (req, res) => {
    let options = {};
    if(req.query.unclassified && req.query.unclassified == 'true') {
        options.person = null;
    }
    Face.find(options, (err, faces) => {
        if(err) {
            return res.status(500).json({message: 'Błąd bazy danych: '+err.message});
        }
        res.json(faces);
    });
}

exports.classifyFace = (req, res) => {
    if(req.body.faceID && typeof req.body.status !== 'undefined') {
        Face.findOne({_id: req.body.faceID}, (err, face) => {
            if(err || !face) {
                return res.status(400).json({message: 'Nie odnaleziono twarzy o podanym id!'});
            }
            if(req.body.status) {
                Person.findOne({_id: req.body.personID}, (err, person) => {
                    if(err || !person) {
                        return res.status(400).json({message: 'Nie odnaleziono osoby o podanym id!'});
                    }
                    face.person = person._id;
                    face.save(err => {
                        if(err) {
                            console.log(err);
                        }
                        Photo.findOne({_id: face.originalImage}, (err, photo) => {
                            if(err || !photo) {
                                console.log('Błąd: Nie odnaleziono zdjęcia dla twarzy '+face._id);
                            } else {
                                photo.people.push(person._id);
                                photo.save(err => {
                                    if(err) {
                                        console.log(err);
                                    }
                                    person.photos.push(photo._id);
                                    person.faces.push(face._id);
                                    person.save(err => {
                                        if(err) {
                                            console.log(err);
                                        }
                                        res.sendStatus(200);
                                    });
                                });
                            }
                        });
                    });
                });
            } else {
                Face.deleteOne({_id: face._id}, err => {
                    if(err) {
                        return res.status(500).json({message: 'Nie można usunąć twarzy'});
                    }
                    fs.unlink('.'+face.url, err => {
                        if(err) {
                            console.log(err);
                        }
                        res.sendStatus(200);
                    });
                });
            }
        });
    } else {
        res.status(400).json({message: 'Nie podano wszystkich danych!'});
    }
}