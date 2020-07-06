const Photo = require('../models/Photo');
const Face = require('../models/Face');
const fs = require('fs');
const cv = require('opencv4nodejs');

exports.uploadPhoto = (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message: 'Nie przesłano pliku!'});
    }
    let file = req.files.file;
    let photo = Photo({
        url: ''
    });
    const extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    const filePath = `./files/photos/${photo._id.toString()}.${extension}`;
    file.mv((filePath), err => {
        if(err) {
            return res.status(500).json({message: 'Nie można zapisać pliku!'});
        }
        photo.url = '/files/photos/'+photo._id.toString()+'.'+extension;
        photo.save(err => {
            if(err) {
                fs.unlink(filePath, () => {
                    return res.status(500).json({message: 'Błąd bazy danych: '+err.message});
                });
            }
            res.status(201).json(photo);
        });
    });
}

exports.getPhotos = (req, res) => {
    let options = {};
    if(req.query.analyzed && (req.query.analyzed == 'true' || req.query.analyzed == 'false')) {
        options.analyzed = req.query.analyzed;
    }
    Photo.find(options, (err, photos) => {
        if(err) {
            return res.status(500).json({message: 'Błąd bazy danych: '+err.message});
        }
        res.json(photos);
    });
}

exports.removePhoto = (req, res) => {
    Photo.findOne({_id: req.params.id}, (err, photo) => {
        if(err) {
            return res.status(500).json({message: 'Błąd bazy danych: '+err.message});
        }
        if(photo) {
            Photo.deleteOne({_id: req.params.id}, err => {
                if(err) {
                    return res.status(500).json({message: 'Nie można usunąć zdjęcia: '+err.message});
                }
                fs.unlink('.'+photo.url, () => {
                    return res.sendStatus(200);
                });
            });
        } else {
            res.status(400).json({message: 'Nieodnaleziono zdjęcia!'});
        }
    });
}

exports.analyzePhoto = (req, res) => {
    const colors = [
        [255, 0, 0],
        [0, 255, 0],
        [0, 0, 255],
        [255, 255, 0],
        [0, 255, 255],
        [255, 0, 255]
    ];
    Photo.findOne({_id: req.params.id}, (err, photo) => {
        if(err) {
            return res.status(400).json({message: 'Zdjęcie o podanym id nie istnieje'});
        }
        const image = cv.imread('.'+photo.url);
        const imageGray = image.bgrToGray();
        const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
        const faces = classifier.detectMultiScale(imageGray).objects;
        let faceObjects = [];
        for(face of faces) {
            const faceImg = image.getRegion(face);
            let faceObj = Face({
                originalImage: req.params.id
            });
            cv.imwrite('./files/faces/'+faceObj._id+'.jpg', faceImg);
            faceObj.url = '/files/faces/'+faceObj._id+'.jpg';
            faceObj.save(err => {
                if(err) {
                    fs.unlink('./files/faces/'+faceObj._id+'.jpg', () => {
                        return res.status(500).json({message: 'Błąd bazy danych: '+err.message});
                    });
                }
            });
            faceObjects.push(faceObj);
        }
        res.status(200).json(faceObjects);
    });
}