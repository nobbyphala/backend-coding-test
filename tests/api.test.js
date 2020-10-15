'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return success', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: 10,
                    start_long: 10,
                    end_lat: 11,
                    end_long: 11,
                    rider_name: 'test',
                    driver_name: 'test',
                    driver_vehicle: 'bike',
                })
                .expect('Content-Type', /json/)
                .expect({ message: 'Success' })
                .expect(200, done);
        });

        it('should return validation error', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: 100,
                    start_long: 10,
                    end_lat: 11,
                    end_long: 11,
                    rider_name: 'test',
                    driver_name: 'test',
                    driver_vehicle: 'bike',
                })
                .expect('Content-Type', /json/)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message:
                        'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
                })
                .expect(200, done);
        });

        it('should return validation error', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: 10,
                    start_long: 10,
                    end_lat: 1100,
                    end_long: 11,
                    rider_name: 'test',
                    driver_name: 'test',
                    driver_vehicle: 'bike',
                })
                .expect('Content-Type', /json/)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message:
                        'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
                })
                .expect(200, done);
        });

        it('should return validation error rider name', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: 10,
                    start_long: 10,
                    end_lat: 11,
                    end_long: 11,
                    rider_name: 123,
                    driver_name: 'test',
                    driver_vehicle: 'bike',
                })
                .expect('Content-Type', /json/)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Rider name must be a non empty string',
                })
                .expect(200, done);
        });

        it('should return validation error driver name', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: 10,
                    start_long: 10,
                    end_lat: 11,
                    end_long: 11,
                    rider_name: 'test',
                    driver_name: '',
                    driver_vehicle: 'bike',
                })
                .expect('Content-Type', /json/)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Driver name must be a non empty string',
                })
                .expect(200, done);
        });

        it('should return validation error vehicle name', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: 10,
                    start_long: 10,
                    end_lat: 11,
                    end_long: 11,
                    rider_name: 'test',
                    driver_name: 'test',
                    driver_vehicle: '',
                })
                .expect('Content-Type', /json/)
                .expect({
                    error_code: 'VALIDATION_ERROR',
                    message: 'Vehicle name must be a non empty string',
                })
                .expect(200, done);
        });
    });

    describe('GET /rides/:page/:perpage', () => {
        it('should return rides data', (done) => {
            request(app)
                .get('/rides/1/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should return error', (done) => {
            request(app)
                .get('/rides/0/0')
                .expect('Content-Type', /json/)
                .expect(
                    '{"error_code":"RIDES_NOT_FOUND_ERROR","message":"Could not find any rides"}'
                )
                .expect(200, done);
        });
    });

    describe('GET /rides/1', () => {
        it('should return rides data', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});
