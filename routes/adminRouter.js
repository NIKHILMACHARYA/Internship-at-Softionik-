const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

router.post('/login', adminController.login);
router.post('/add_user', adminController.add_user);

module.exports = router;