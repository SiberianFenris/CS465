const mongoose = require('mongoose');
const trips = mongoose.model('trips');

const fetchTrips = async (req, res) => {
    try {
        if (!!req.params.tripCode) {
            const result = await trips.findOne({'code': req.params.tripCode});
            if (!!result){
                res.json(result);
            } else {
                res.status(404).send(`Trip not found ${req.params.tripCode}`);
            }

            return;
        }

        res.json(await trips.find({}));
    } catch (e) {
        res.status(500).json(e);
    }
};

const addTrip = async (req, res) => {
    const newTrip = req.body;

    if(!newTrip) {
        // 400 BAD REQUEST because no trip sent
        res.status(400).sent('No trip record found in body of request');
        return;
    }

    try {
        const savedTrip = await trips.create(newTrip);

        //201 CREATED response with the trip -- we send it back because it'll have mongodb id
        res.status(201).json(savedTrip);
    } catch (e) {
        // 400 BAD REQUEST because trip failed to create
        res.status(400).json(e);
    }
};

const updateTrip = async (req, res) => {
    const tripCode = req.params.tripCode;
    let trip = req.body;

    trip = Object.assign(trip, {tripCode});

    try {
        const updatedTrip = await trips.findOneAndUpdate({'code': tripCode}, trip, {new: true});

        if(updateTrip == null) {
            res.status(404).send(`Trip not found ${tripCode}`);
            return;
        }

        res.status(200).json(updatedTrip);
    } catch (e) {
        res.status(500).json(e);
    }
};

module.exports = {
    fetchTrips,
    addTrip,
    updateTrip
};