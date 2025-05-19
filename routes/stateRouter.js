const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController.js');

router.get('/list-state', stateController.state_list);
router.post('/add_state', stateController.add_state);

module.exports = router;
