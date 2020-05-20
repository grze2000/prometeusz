require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const Person = require('./models/Person');
const Info = require('./models/Info');
const passport = require('passport');
require('./config/passport')(passport);
const jwt = require('jsonwebtoken');
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log('Conected to database');
}).catch(err => {
    console.log(`Error: ${err.message}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//passport.authenticate('jwt', {session: false})
app.post('/login', (req, res) => {
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
});

app.post('/register', (req, res) => {
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
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));