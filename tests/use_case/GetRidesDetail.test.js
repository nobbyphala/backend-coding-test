const chai = require('chai');
const sinon = require('sinon');
const { error } = require('winston');
const getRidesDetail = require('../../src/use_cases/rides/GetRidesDetail');

var assert = chai.assert;
describe('Get riders detail', () => {
    it('should not error', () => {
        const mockGetRides = (ridesID, callback) => {
            assert.equal(ridesID, 1);
        };

        const usecase = getRidesDetail({ getRides: mockGetRides });

        usecase
            .Execute(1, () => {})
            .then((value) => {})
            .catch((error) => {
                assert.isUndefined(error, 'function should not got any error');
            });
    });

    it('should error', () => {
        const mockGetRides = (ridesID, callback) => {
            assert.equal(ridesID, 1);
            throw new Error('error');
        };

        const usecase = getRidesDetail({ getRides: mockGetRides });

        usecase
            .Execute(1, () => {})
            .then((value) => {})
            .catch((error) => {
                assert.notEqual(error, undefined);
            });
    });
});
