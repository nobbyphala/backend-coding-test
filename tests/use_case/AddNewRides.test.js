const { assert } = require('chai');
const sinon = require('sinon');
const { error } = require('winston');
const addNewRidesUsecase = require('../../src/use_cases/rides/AddNewRides');

describe('Add new rides', () => {
    it('should not error', (done) => {
        var addRides = sinon.fake();

        const usecase = addNewRidesUsecase({ addRides });

        usecase.Execute({});
        assert.equal(addRides.called, true);
        done();
    });

    it('should got error', (done) => {
        var addRides = sinon.fake.throws(new Error("error"));

        const usecase = addNewRidesUsecase({ addRides });

       
            usecase.Execute(1, () => {}).catch( (error) => {
                assert.notEqual(error, undefined)
            });
        
        
        assert.equal(addRides.called, true);
        done();
    });
});
