const mongoose = require('mongoose');
const bcrypt = require('bcryptjs') ;
const jwt = require('jsonwebtoken') ;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg'
    },
    phone: {
        type: String,
    },
}) ;

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10) ;
}) ;

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    })
};

userSchema.methods.isValidatedPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password)
};

const User = mongoose.model("User", userSchema) ;
module.exports = User ;