const logger = require('../../config/winston');

const getAllRides = (ridesRepository) => {
    const Execute = async (rowPerPage, page, callback) => {
        try {
            const offset = page * rowPerPage - rowPerPage;
            const limit = rowPerPage;

            console.log(limit);

            ridesRepository.getAllRides(limit, offset, (err, rows, totalData)=>{
                if (err){
                    throw(err);
                }

                const totalPage = Math.ceil(Number(totalData) / Number(rows.length) );

                const result = {
                    datas: rows,
                    dataCount: rows.length,
                    totalData: totalData,
                    totalPage: totalPage,
                    currentPage: page,
                    dataPerPage: rowPerPage,
                };
                callback(err, result);
            });
        } catch (error) {
            logger.error(error);
        }
        
    };

    return {Execute};
};

module.exports = getAllRides;