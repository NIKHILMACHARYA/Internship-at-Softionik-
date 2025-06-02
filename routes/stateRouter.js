const express = require('express');
const router = express.Router();
const stateController = require('../controllers/statecontroller.js');

router.get('/state_list', stateController.state_list);
router.post('/add_state', stateController.add_state);
router.post('/state_update', stateController.state_update);
router.post('/state_list_byid', stateController.state_list_byid);
router.post('/state_delete', stateController.state_delete);

module.exports = router;
