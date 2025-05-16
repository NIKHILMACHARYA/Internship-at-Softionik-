const express = require('express');
const router = express.Router();
const countrycontroller = require('../controllers/countrycontroller.js');

router.post('/add_country', countrycontroller.add_country);
router.get('/country_list', countrycontroller.country_list);
 
module.exports = router;