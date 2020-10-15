const { assert } = require('sinon');
const sinon = require('sinon');
const getAllRidesUsecase = require('../../src/use_cases/rides/GetAllRides');

describe('Get all rides', () => {
    it('should not error', (done) => {
       var mock = sinon.fake();

       const usecase = getAllRidesUsecase({getAllRides: mock});

       usecase.Execute({})
       assert.called(mock)
       
       done();
    });
});