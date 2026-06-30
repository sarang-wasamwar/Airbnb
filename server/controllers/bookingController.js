const Booking = require('../models/Booking') ;
exports.createBookings = async (req, res) => {
    try {
        const userData = req.user ;
        const {place, checkIn, checkOut, numOfGuests, name, phone, price} = req.body ;
        const booking = await Booking.create({
            user: userData._id,
            place,
            checkIn, checkOut, numOfGuests, name,
            phone, price
        });
        res.status(201).json({
            success: true, 
            booking
        }) ;
    } catch (err) {
        res.status(500).json({
            message: "Failed to create booking",
            error: err
        })
    }
};

exports.getBookings = async (req, res) => {
    try {
        const userData = req.user ;
        if (!userData) {
            return res.status(401).json({
                error: "You are not authorized!"
            })
        }
        const booking = await Booking.find({user: userData._id}).populate("place");
        res.status(200).json({
            success: true,
            booking
        })
    } catch (err) {
        console.log(err) ;
        res.status(500).json({
            message: "Failed to get bookings",
            error: err
        })
    }
};