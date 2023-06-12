const mongoose = require('mongoose');
const apiOptions = {
    server: 'http://localhost:3000'
};

const trips = mongoose.model('trips');

/* GET travel view */
const travel = async (req, res) => {
    res.render('travel', { title: 'Travlr Getaways', trips: await trips.find({}), travelSelected: req.path == '/travel' });
};

module.exports = {
    travel
};
