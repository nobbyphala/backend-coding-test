const logger = require('../../config/winston');

const getRidesDetail = (ridesRepository) => {
    const Execute = async (ridesID, callback) => {
        try {
            ridesRepository.getRides(ridesID, (err, row) => {
                return callback(row);
            });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    };

    return {
        Execute,
    };
};

module.exports = getRidesDetail;
