/* GET travel view */
const travel = (req, res) => { // This is the controller for the travel page.
    res.render('travel', { title: 'Travlr Getaways' });
};

module.exports = {
    travel
};
