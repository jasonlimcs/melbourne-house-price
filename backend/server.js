const utils = require('./utils/utils.js');
const ejs = require('ejs');

const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;
const VIEWS_FOLDER = path.join(__dirname, "views/");

app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {    
    console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(VIEWS_FOLDER + '/index.html');
});

app.get('/get-location-names', (req, res) => {
    const locationNames = utils.getLocationNames();
    res.send(locationNames);
});

app.get('/get-types', (req, res) => {
    const types = utils.getTypes();
    res.send(types);
});
