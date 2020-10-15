const ridesRepository = (db) =>{
    const addRides = async (rideData) =>{
        const query = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const values = [
            rideData.startLatitude,
            rideData.startLongitude,
            rideData.endLatitude,
            rideData.endLongitude,
            rideData.riderName,
            rideData.driverName,
            rideData.driverVehicle,
        ];

        await db.run(query, values);
    };

    const getRides = async (ridesID, callback) =>{
        const query = `SELECT * FROM Rides WHERE rideID='${ridesID}'`;

        db.all(query, (err, row)=>{
            callback(err, row);
        });
    };

    const getAllRides = async (limit, offset, callback) =>{
        const query = `SELECT * FROM Rides LIMIT ${limit} OFFSET ${offset}`;
        const queryRowCount = `SELECT count(*) AS totalData FROM Rides`;

        db.all(query, (err, rows) =>{
            if(err){
                callback(err,null,0)
            }
           
            const ridesData = rows;
            
            //check for data count
            db.all(queryRowCount, (err, rows)=>{
                if (err){
                    callback(err,null,0)
                }

                const totalData = rows[0].totalData;
                
                callback(null, ridesData, totalData);
            });
        });
    };
    
    return {
        addRides,
        getRides,
        getAllRides,
    }
};

module.exports = ridesRepository;
