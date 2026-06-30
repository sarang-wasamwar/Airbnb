const mongoose = require('mongoose');
const connectWithDB = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL)
    .then(console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.log("MongoDB connection failed");
        console.log(err) ;
        process.exit(1) ;
    }) ;
} ;
module.exports = connectWithDB ;