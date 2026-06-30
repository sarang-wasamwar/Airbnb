const User = require("../models/User");
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2 ;

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body ;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, Email Id, Passwrods are must required"
            });
        }
        let user = await User.findOne({email}) ;
        if (user) {
            return res.status(400).json({
                message: "User already registered"
            });
        }
        user = await User.create({
            name, email, password
        });
        cookieToken(user,res);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err,
        });
    }
};

// login - signup
exports.login = async (req,res) => {
    try {
        const {email, password} = req.body ;
        if(!email || !password) {
            return res.status(400).json({
                message: "Email & Password are requried"
            });
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message: "Email or Password is Incorrect!"
            });
        }
        cookieToken(user,res) ;
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err,
        });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const {name, email} = req.body ;
        if(!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        let user = await User.findOne({email});
        if (!user) {
            user = await User.create({
                name, email,
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10)
            });
        }
        cookieToken(user, res) ;
    } catch (err) {
        res.status (500).json({
            message: "Internal server error",
            error: err
        });
    }
};

exports.uploadPicture = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No picture uploaded" });
    }
    const {path} = req.file
    try {
        let result = await cloudinary.uploader.upload(path, {
            folder: 'Airbnb/Users'
        });
        res.status(200).json(result.secure_url)
    } catch (error) {
        res.status(500).json({
            error,
            message: "Internal Server Error"
        });
    }
}

// user can update the name, only password profile pic or any of them
exports.updateUserDetails = async (req, res) => {
    try {
        const { name, password, email, picture, phone } = req.body;
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized: Please log in"
            });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                message: "Update Failed: User not found"
            });
        }
        
        user.name = name || user.name;
        user.email = email || user.email;
        if (phone !== undefined) {
            user.phone = phone;
        }
        if (picture) {
            user.picture = picture;
        }
        if (password) {
            user.password = password;
        }
        
        const updateUser = await user.save() ;
        cookieToken(updateUser, res) ;
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({
            message: "Can't Update/Internal server error"
        });
    }
};

exports.logout = async (req, res) => {
    res.cookie('token', null , {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    res.status(200).json({
        success: true, message: 'Logged Out'
    });
};