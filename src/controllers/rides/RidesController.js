const ridesRepository = require("../../frameworks/persistence/db/RidesRepository");
const addNewRidesUsecase = require('../../use_cases/rides/AddNewRides');
const getRideDetailUsecase = require('../../use_cases/rides/GetRidesDetail');
const getAllRidesUsecase = require('../../use_cases/rides/GetAllRides');
const logger = require('../../config/winston');

const ridesController = (dependencies) => {
    const repository = ridesRepository(dependencies.db);

    const addNewRides = (req, res) =>{
        const usecase = addNewRidesUsecase(repository);

        //validation
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (
            startLatitude < -90 ||
            startLatitude > 90 ||
            startLongitude < -180 ||
            startLongitude > 180
        ) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message:
                    'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (
            endLatitude < -90 ||
            endLatitude > 90 ||
            endLongitude < -180 ||
            endLongitude > 180
        ) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message:
                    'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            });
        }

       try {
            usecase.Execute({
                startLatitude: startLatitude,
                startLongitude: startLongitude,
                endLatitude: endLatitude,
                endLongitude: endLongitude,
                riderName: riderName,
                driverName: driverName,
                driverVehicle: driverVehicle,
            });
       } catch (error) {
           logger.error(error);
           return res.send({
               error_code: "SERVER_ERROR",
               message: "Internal Server Error",
           })
       }

       return res.send({
           message: "Success",
       })
    }

    const getRidesDetail = (req, res) =>{
        const usecase = getRideDetailUsecase(repository);

        const callback = (rows) =>{
            if (rows.length == 0){
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides',
                });
            }
            return res.send(rows);
        }

        try {
            usecase.Execute(req.params.id, callback)
        } catch (error) {
           logger.error(error);
            return res.send({
                error_code: "SERVER_ERROR",
                message: "Internal Server Error",
            });
        }
    }

    const getAllRides = (req, res) => {
        const usecase = getAllRidesUsecase(repository);

        const page = Number(req.params.page);
        const dataPerPage = Number(req.params.dataPerPage);
        
        try {
            usecase.Execute(dataPerPage, page, (_, result) =>{
                if (result.datas.length == 0){
                    return res.send({
                        error_code: 'RIDES_NOT_FOUND_ERROR',
                        message: 'Could not find any rides',
                    });
                };

                res.send(result);
            });
        } catch (error) {
            logger.error(error);
            return res.send({
                error_code: "SERVER_ERROR",
                message: "Internal Server Error",
            });
        }
    }

    return {
        addNewRides,
        getRidesDetail,
        getAllRides,
    }
}

module.exports = ridesController;