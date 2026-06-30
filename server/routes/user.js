const express = require('express');
const router = express.Router() ;
const multer = require('multer');
const upload = multer({dest:'/tmp'});

const { isLoggedIn } = require('../middleware/user');

const {
    register, login, logout, googleLogin, uploadPicture,
    updateUserDetails,
} = require('../controllers/userController') ;

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google/auth').post(googleLogin);
router.route('/update-picture').post(upload.single('picture'), uploadPicture);
router.route('/update-user').put(updateUserDetails);

// Dynamic routes matching client expectations
router.route('/auth/me').get(isLoggedIn, (req, res) => {
    res.status(200).json(req.user);
});
router.route('/profile').put(isLoggedIn, updateUserDetails);
router.route('/users/profile-picture').post(isLoggedIn, upload.single('photo'), uploadPicture);

router.route('/logout').get(logout);

module.exports = router ;