const Person = require('../models/Person');

exports.getPeople = (req, res) => {
    Person.find({}).populate('photos').populate('faces').exec((err, people) => {
        if(err) {
            res.status(500).json({message: 'Błąd bazy danych: '+err.message});
        } else {
            res.json(people);
        }
    });
}

exports.getPerson = (req, res) => {
    Person.findOne({_id: req.params.id}).populate('photos').populate('faces').exec((err, person) => {
        if(err) {
            res.status(500).json({message: 'Błąd bazy danych: '+err.message});
        } else {
            res.json(person);
        }
    });
}

exports.addPerson = (req, res) => {
    if(req.body.firstname && req.body.lastname) {
        const person = Person(req.body);
        person.save(err => {
            if(err) {
                res.status(500).json({message: 'Błąd bazy danych: '+err.message});
            } else {
                res.sendStatus(201);
            }
        })
    } else {
        res.status(400).json({message: 'Imię i nazwisko jest wymagane!'});
    }
}