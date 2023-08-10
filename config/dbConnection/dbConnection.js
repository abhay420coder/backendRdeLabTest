const mongoose = require('mongoose');

const connectDB = async(CONNECTION_STRING) => {
    try {
        const connect = await mongoose.connect(CONNECTION_STRING);
        console.log("Data base connecte with host" , connect.connection.host)
        console.log("Data base connecte with database name" , connect.connection.name)
    } catch (err) {
        console.log(err);
        process.exit(1) ; // if we have error then our process will be exit
    }
}

module.exports = {connectDB}