const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController.js');
const imageuploadController = require('../controllers/imageuploadController.js');

router.post('/add_image', imageuploadController.single('img'),imageController.add_image );
router.post('/edit_image', imageuploadController.single('img'),imageController.edit_image );
router.get('/list_image', imageuploadController.single('img'),imageController.list_image );
router.post('/list_byid_image', imageuploadController.single('img'),imageController.list_byid_image );
router.post('/delete_image', imageuploadController.single('img'),imageController.delete_image );

module.exports = router;
