require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Info = require('./models/Info');
const passport = require('passport');
require('./config/passport')(passport);
const cors = require('cors');
const loginController = require('./controllers/loginController');
const personController = require('./controllers/personController');
const photoController = require('./controllers/photoController');
const faceController = require('./controllers/faceController');
const dataController = require('./controllers/dataController');

mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
    console.log('Conected to database');
}).catch(err => {
    console.log(`Error: ${err.message}`);
});

app.use('/files', express.static('files'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.post('/login', loginController.login);
app.post('/register', loginController.register);

app.post('/people', passport.authenticate('jwt', {session: false}), personController.addPerson);
app.get('/people', passport.authenticate('jwt', {session: false}), personController.getPeople);
app.get('/people/:id', passport.authenticate('jwt', {session: false}), personController.getPerson);

app.get('/photos2', passport.authenticate('jwt', {session: false}), photoController.getPhotos);
app.get('/photos/:id', passport.authenticate('jwt', {session: false}), photoController.getPhoto);
app.post('/upload', passport.authenticate('jwt', {session: false}), photoController.uploadPhoto);
app.delete('/photos/:id', passport.authenticate('jwt', {session: false}), photoController.removePhoto);

app.post('/analyze/:id', photoController.analyzePhoto);

app.get('/faces', passport.authenticate('jwt', {session: false}), faceController.getFaces);
app.post('/faces/:id', passport.authenticate('jwt', {session: false}), faceController.classifyFace);

app.get('/import/data', passport.authenticate('jwt', {session: false}), dataController.importData);
app.get('/import/photos', passport.authenticate('jwt', {session: false}), dataController.importPhotos);
app.get('/export/data', passport.authenticate('jwt', {session: false}), dataController.exportData);
app.get('/export/photos', passport.authenticate('jwt', {session: false}), dataController.exportPhotos);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));