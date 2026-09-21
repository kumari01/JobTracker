const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb connected successfully");
    }
    catch(err){
        console.log("Mongodb connection error", err);
    }
}
module.exports = connectDB;