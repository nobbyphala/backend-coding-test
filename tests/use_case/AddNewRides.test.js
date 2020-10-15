const { assert } = require('sinon');
const sinon = require('sinon');
const addNewRidesUsecase = require('../../src/use_cases/rides/AddNewRides');

describe('Add new rides', () => {
    it('should not error', (done) => {
       var addRides = sinon.fake();

       const usecase = addNewRidesUsecase({addRides});

       usecase.Execute({})
       assert.called(addRides)
       done();
    });
});