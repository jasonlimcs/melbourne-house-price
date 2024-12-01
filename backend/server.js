const utils = require('./utils/utils.js');
const ejs = require('ejs');

const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;
const VIEWS_FOLDER = path.join(__dirname, "views/");

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(PORT, () => {    
    console.log(`Server listening on port ${PORT}`);
});
utils.loadSavedArtifacts();
app.get('/', (req, res) => {
    
    res.render(VIEWS_FOLDER + 'index.html', {suburbs: utils.getSuburbNames(), types: utils.getTypes()});
});

app.get('/get-location-names', (req, res) => {
    const locationNames = utils.getLocationNames();
    res.send(locationNames);
});

app.get('/get-types', (req, res) => {
    const types = utils.getTypes();
    res.send(types);
});

app.post('/predictPrice', (req, res) => {
    const suburb = req.body.suburb;
    const type = req.body.type;
    const distance = parseInt(req.body.distance);
    const bedroom = parseInt(req.body.bedroom);
    const bathroom = parseInt(req.body.bathroom);
    const landsize = parseInt(req.body.landsize);
    const car = parseInt(req.body.car);
    const yearBuilt = parseInt(req.body.yearBuilt);

    const predictedPrice = utils.predictHousePrice(suburb, distance, bedroom, bathroom, car, landsize, yearBuilt, type);
    // const predictedPrice = utils.predictHousePrice('Airport West', 13, 3, 2, 1, 500, 2000, 'u')
    // const predictedPrice = {suburb, type, distance, bedroom, bathroom, landsize, car, yearBuilt};
    res.send(predictedPrice);
});