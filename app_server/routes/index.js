const express = require('express'); //updated to const from var
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index); {
};

module.exports = router;