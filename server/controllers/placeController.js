const Place = require('../models/Place');

exports.addPlace = async (req, res) => {
    try {
        const userData = req.user ;
        const {title, address, photos, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, maxGuest, price} = req.body ;
        const place = await Place.create({
            owner: userData._id,
            title,
            address,
            photos: photos || addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests: maxGuests || maxGuest,
            maxGuest: maxGuests || maxGuest,
            price
        });
        res.status(200).json({place});
    } catch (err) {
        console.error("Add place error:", err);
        res.status(500).json({
            message: "Failed to add place",
            error: err
        });
    }
};

exports.userPlaces = async (req, res) => {
    try {
        const userData = req.user ;
        const id = userData._id ;
        res.status(200).json(await Place.find({owner: id}));
    } catch (err) {
        console.error("User places fetch error:", err);
        res.status(500).json({
            message: "Failed to fetch user places",
            error: err
        });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const userData = req.user ;
        const userId = userData._id ;
        const { id } = req.params;
        const {title, address, photos, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, maxGuest, price} = req.body ;
        
        const place = await Place.findById(id) ;
        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }
        
        if (userId.toString() === place.owner.toString()) {
            place.set({
                title,
                address,
                photos: photos || addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests: maxGuests || maxGuest,
                maxGuest: maxGuests || maxGuest,
                price
            }) ;
            await place.save() ;
            res.status(200).json({message: "Place updated successfully!"});
        } else {
            res.status(403).json({ message: "Unauthorized: You do not own this place" });
        }
    } catch (err) {
        console.error("Update place error:", err);
        res.status(500).json({
            message: "Internal Server error"
        }) ;
    }
};

exports.getPlaces = async (req, res) => {
    try {
        const places = await Place.find() ;
        res.status(200).json(places);
    } catch (err) {
        console.error("Get places error:", err);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
};

exports.singlePlace = async (req, res) => {
    try {
        const {id} = req.params ;
        const place = await Place.findById(id) ;
        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }
        res.status(200).json(place);
    } catch (err) {
        console.error("Fetch single place error:", err);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
};

exports.searchPlaces = async (req, res) => {
    try {
        const { key } = req.params;
        if (!key || key.trim() === '') {
            return res.status(200).json(await Place.find());
        }
        const searchMatches = await Place.find({
            $or: [
                { address: { $regex: key, $options: "i" } },
                { title: { $regex: key, $options: "i" } }
            ]
        });
        res.status(200).json(searchMatches);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};