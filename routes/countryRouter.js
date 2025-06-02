const express = require('express');
const router = express.Router();
const countrycontroller = require('../controllers/countrycontroller.js');

router.post('/add_country', countrycontroller.add_country);
router.get('/country_list', countrycontroller.country_list);
router.post('/country_list_byid', countrycontroller.country_list_byid);
router.post('/country_update', countrycontroller.country_update);
router.post('/country_delete', countrycontroller.country_delete);

module.exports = router;
