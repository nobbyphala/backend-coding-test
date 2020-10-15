const getRidesDetail = (ridesRepository) => {
    const Execute = async (ridesID, callback) => {
        try {
            ridesRepository.getRides(ridesID, (err, row)=>{
                if (err){
                    throw(err);
                }

                return callback(row);
            });
        } catch (error) {
            console.log(error)
        }
        
    };

    return {Execute};
};

module.exports = getRidesDetail;