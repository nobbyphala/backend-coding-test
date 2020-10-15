'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const ridesController = require('./controllers/rides/RidesController');

module.exports = (db) => {
    const depedencies = {
        db,
    };

    const controllers = ridesController(depedencies);
    app.get('/health', (req, res) => res.send('Healthy'));
    app.post('/rides', jsonParser, controllers.addNewRides);
    app.get('/rides/:page/:dataPerPage',controllers.getAllRides)
    
    app.get('/rides/:id', controllers.getRidesDetail);
    
    return app;
};
