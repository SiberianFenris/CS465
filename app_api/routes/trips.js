const express = require('express');
const router = express.Router();
const controller = require('../controllers/trips');
const jwt = require('express-jwt');

const {expressjwt: jwt} = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});



router.get('/:tripCode?', controller.fetchTrips);
router.post('/', auth, controller.addTrip);
router.put('/:tripCode', auth, controller.updateTrip);
router.delete('/:tripCode', auth, controller.deleteTrip);

module.exports = router;