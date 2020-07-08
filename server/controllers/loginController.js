const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    if(req.body.username && req.body.password) {
        User.findOne({username: req.body.username}, (err, user) => {
            if(err) {
                console.log(err);
                res.status(500).json({message: 'Błąd bazy danych'});
            } else if(!user) {
                res.status(401).json({message: 'Nieprawidłowa nazwa użytkownika'});
            } else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if(!err && isMatch) {
                        const token = jwt.sign({id: user._id}, process.env.SECRET);
                        res.json({token: 'JWT '+token});
                    } else {
                        res.status(401).json({message: 'Nieprawidłowe hasło'});
                    }
                });
            }
        });
    } else {
        res.status(401).json({message: 'Podaj nazwę użytkownika i hasło'});
    }
}

exports.register = (req, res) => {
    if(req.body.username && req.body.password) {
        let newUser = User({
            username: req.body.username,
            password: req.body.password
        });
        newUser.save(err => {
            if(err) {
                console.log(err);
                res.status(500).json({message: 'Błąd bazy danych: '+err.message});
            } else {
                res.status(201).json({message: 'Użytkownik został utworzony'});
            }
        });
    } else {
        res.status(400).json({message: 'Podaj nazwę użytkownika i hasło'});
    }
}