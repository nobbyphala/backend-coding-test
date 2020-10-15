const logger = require('../../config/winston');

const addNewRides = (ridesRepository) => {
    const Execute = async (ridesData) => {
        try {
            await ridesRepository.addRides(ridesData);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    };

    return {
        Execute,
    };
};

module.exports = addNewRides;
