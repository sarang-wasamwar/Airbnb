const express = require('express');
const router = express.Router() ;
const {isLoggedIn} = require('../middleware/user');

const { addPlace, getPlaces, updatePlace, singlePlace,
    userPlaces, searchPlaces,
} = require('../controllers/placeController') ;

router.route('/places')
    .get(getPlaces)
    .post(isLoggedIn, addPlace);

router.route('/user-places').get(isLoggedIn, userPlaces);

router.route('/places/:id')
    .get(singlePlace)
    .put(isLoggedIn, updatePlace);

router.route('/places/search/:key').get(searchPlaces);

module.exports = router ;