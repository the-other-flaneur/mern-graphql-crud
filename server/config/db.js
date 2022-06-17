// bring mongoose
const mongoose = require('mongoose');

const connectDB = async () => { // create a connectdb async funtion cause mongoose returns promises
    const conn = await mongoose.connect(process.env.MONGO_URI); // connection, await for this, pass mongo rui variable

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold) // log the host using colors  
};

// export funtion to use
module.exports = connectDB;