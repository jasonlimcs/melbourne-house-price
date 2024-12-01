const path = require('path');
const fs = require('fs');

let __suburbs = null;
let __types = null;
let __data_columns = null;
let __model = null;

function predictHousePrice(suburb, distance, bedroom, bathroom, car, landsize, yearBuilt, house_type) {
    let sub_idx = 0;
    let type_idx = 0;
    try {
        sub_idx = __data_columns.indexOf('suburb_'+suburb.toLowerCase());
    } catch (error) {
        sub_idx = -1;
    }

    try {
        type_idx = __data_columns.indexOf('type_'+house_type.toLowerCase());
    } catch (error) {
        type_idx = -1;
    }

    const x = Array(__data_columns.length).fill(0);
    x[0] = distance
    x[1] = bedroom
    x[2] = bathroom
    x[3] = car
    x[4] = landsize
    x[5] = yearBuilt
    if (sub_idx > 0) {
        x[sub_idx] = 1
    }
    if (type_idx > 0) {
        x[type_idx] = 1
    }
    
    const coefficients = __model['coefficients'];
    const intercept = __model['intercept'];
    dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

    const predictedPrice = dot(x, coefficients) + intercept;
    return predictedPrice.toFixed(2);
}


        

function loadSavedArtifacts() {
    console.log("Loading saved artifacts..."); 

    const columnsPath = path.join(__dirname, '../artifacts/columns.json');
    const modelPath = path.join(__dirname, '../artifacts/melbourne_housing_model.json');

    const columnsData = JSON.parse(fs.readFileSync(columnsPath));
    __data_columns = columnsData['data_columns'];
    __suburbs = __data_columns.slice(6, __data_columns.length-3);
    __types = __data_columns.slice(__data_columns.length-3);

    if (__model == null) {
        const modelData = JSON.parse(fs.readFileSync(modelPath));
        __model = modelData;
    }

    console.log("Loaded saved artifacts.");
}

function getSuburbNames() {
    return __suburbs;
}

function getTypes() {
    return __types;
}

function getDataColumns() {
    return __data_columns;
}


// loadSavedArtifacts();
// console.log(predictHousePrice('Airport West', 13, 3, 2, 1, 500, 2000, 'u'))
// console.log(__model['coefficients'])
// console.log(getSuburbNames());   

module.exports = {
    getSuburbNames,
    getTypes,
    getDataColumns,
    loadSavedArtifacts,
    predictHousePrice
};
