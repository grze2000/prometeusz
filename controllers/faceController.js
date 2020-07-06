const Face = require('../models/Face');

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