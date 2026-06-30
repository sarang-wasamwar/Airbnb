const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isLoggedIn = async (req, res, next) => {
    const authHeader = req.header('Authorization') || req.header('Authorisation');
    const token = req.cookies?.token || (authHeader ? authHeader.replace('Bearer ', '').trim() : null);
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Login first to access this page"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error("JWT Verification error:", error);
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};
