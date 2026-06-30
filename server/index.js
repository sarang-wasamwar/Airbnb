require("dotenv").config() ;
const express = require("express") ;
const cors = require("cors") ;
const connectWithDB = require("./config/db") ;
const cloudinary = require("cloudinary").v2 ;
const cookieSession = require("cookie-session") ;
const cookieParser = require("cookie-parser") ;

// Connect with database
connectWithDB() ;

// Cloudinary configuration
cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: 'dgokpgxyv', 
    api_key: '375335184671834', 
    api_secret: 'MTFA-sEAl_7Ch7wdxY0A3GGHNNE'
}) ;

const app = express() ;
app.use(cookieParser()) ;
app.use(
    (cookieSession({
        name: "session",
        maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
        keys: [process.env.SESSION_SECRET],
        secure: true,
        sameSite: "none",
        httpOnly: true,
    })) 
) ;
app.use(express.json()) ;
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
})) ;

// API Routes
app.use("/api", require("./routes/index")) ;
app.use("/api", require("./routes/user")) ;
app.use("/api", require("./routes/place")) ;
app.use("/api/bookings", require("./routes/booking")) ;

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) ;
}).on('error', (err) => {
    console.log("Server failed to start: ", err) ;
});

module.exports = app ;