const express = require('express');
const router = express.Router();
const citycontroller = require('../controllers/citycontroller.js');

router.get('/city_list', citycontroller.city_list);
router.post('/add_city', citycontroller.add_city);
router.post('/city_list_byid', citycontroller.city_list_byid);
router.post('/city_update', citycontroller.city_update);
router.post('/city_delete', citycontroller.city_delete);

module.exports = router;
