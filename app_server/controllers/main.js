/* GET homepage */
const index = (req, res) => { // This is the controller for the homepage.
    res.render('index', { title: 'Travlr Getaways' });
};

module.exports = {
    index
};
