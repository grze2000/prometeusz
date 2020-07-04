const Photo = require('../models/Photo');
const fs = require('fs');

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
        photo.url = '/photos/'+photo._id.toString()+'.'+extension;
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