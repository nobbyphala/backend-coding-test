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

    /**
    * 
    * @api {get} /health Check service health
    * @apiName HealthCheck
    * @ApiGroup Rides Service
    * @apiSuccessExample Success-Response:
    *   Success
    */
    app.get('/health', (req, res) => res.send('Healthy'));

    /**
    * 
    * @api {Post} /rides Add rides
    * @apiName Add New Rides
    * @ApiGroup Rides Service
    * 
    * @apiParam {Number} start_lat Riders Latitude. (mandatory)
    * @apiParam {Number} start_long Riders Longitude. (mandatory)
    * @apiParam {Number} end_lat Riders destinaton Latitude. (mandatory)
    * @apiParam {Number} end_long Riders destination Latitude. (mandatory)
    * @apiParam {String} rider_name Riders Name. (mandatory)
    * @apiParam {String} driver_name Driver Name. (mandatory)
    * @apiParam {String} driver_vehicle Driver Vehicle. (mandatory)
    * 
    * @apiParamExample {json} Request-Example:
    *   {
    *       "start_lat": 10,
    *       "start_long":10,
    *       "end_lat": 11,
    *       "end_long": 11,
    *       "rider_name": "test",
    *       "driver_name": "test",
    *       "driver_vehicle": "bike"
    *   }
    * 
    * 
    * @apiSuccessExample Success-Response:
    *   {
    *       "message": "Success"
    *   }
    * 
    * @apiErrorExample Error-Response:
    *   {
    *       "error_code": "SERVER_ERROR",
    *       "message": "Server error"
    *   }
    */
    app.post('/rides', jsonParser, controllers.addNewRides);

    /**
    * 
    * @api {GET} /rides/:page/:dataPerPage Get All rides
    * @apiName Get All Rides
    * @ApiGroup Rides Service
    * 
    * @apiParam {Number} page Data page for pagination. (mandatory)
    * @apiParam {Number} dataPerPage Number of rows data returned per page. (mandatory)
    * 
    * 
    * 
    * @apiSuccessExample Success-Response:
    *{
    *   "datas": [
    *    "rideID": 1,
    *            {
    *            "startLat": 10,
    *            "startLong": 10,
    *            "endLat": 11,
    *            "endLong": 11,
    *            "riderName": "test",
    *            "driverName": "test",
    *            "driverVehicle": "bike",
    *            "created": "2020-10-15 11:20:40"
    *        },
    *        {
    *            "rideID": 2,
    *            "startLat": 10,
    *            "startLong": 10,
    *            "endLat": 11,
    *            "endLong": 11,
    *            "riderName": "test",
    *            "driverName": "test",
    *            "driverVehicle": "bike",
    *            "created": "2020-10-15 11:20:40"
    *        }
    *    ],
    *        "dataCount": 2,
    *        "totalData": 3,
    *        "totalPage": 2,
    *        "currentPage": 1,
    *        "dataPerPage": 2
    *    }
    * 
    * @apiErrorExample Error-Response:
    *   {
    *       "error_code": "SERVER_ERROR",
    *       "message": "Server error"
    *   }
    */
    app.get('/rides/:page/:dataPerPage', controllers.getAllRides);

    /**
    * 
    * @api {GET} /rides/:id Get Rides detail by id
    * @apiName Get Rider Detail
    * @ApiGroup Rides Service
    * 
    * @apiParam {id} Riders ID. (mandatory)
    * 
    * 
    * 
    * @apiSuccessExample Success-Response:
    *[
    *    {
    *        "rideID": 3,
    *        "startLat": 10,
    *        "startLong": 10,
    *        "endLat": 11,
    *        "endLong": 11,
    *        "riderName": "test",
    *        "driverName": "test",
    *        "driverVehicle": "bike",
    *        "created": "2020-10-15 11:23:33"
    *    }
    *]
    * 
    * @apiErrorExample Error-Response:
    *   {
    *       "error_code": "SERVER_ERROR",
    *       "message": "Server error"
    *   }
    */
    app.get('/rides/:id', controllers.getRidesDetail);

    const controllers = ridesController(depedencies);
    app.get('/health', (req, res) => res.send('Healthy'));
    app.post('/rides', jsonParser, controllers.addNewRides);
    app.get('/rides/:page/:dataPerPage', controllers.getAllRides);
    app.get('/rides/:id', controllers.getRidesDetail);

    return app;
};
