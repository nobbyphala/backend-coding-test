const addNewRides = (ridesRepository) => {
    const Execute = async (ridesData) => {
        try {
            ridesRepository.addRides(ridesData);
        } catch (error) {
            console.log(error)
            return error
        }
        
    };

    return {Execute};
};

module.exports = addNewRides;