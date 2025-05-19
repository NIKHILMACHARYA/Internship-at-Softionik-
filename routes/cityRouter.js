const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController.js');

router.get('/city-list', cityController.city_list);
router.post('/add_city', cityController.add_city);

module.exports = router;
