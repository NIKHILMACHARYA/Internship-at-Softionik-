const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController.js');
const imageuploadController = require('../controllers/imageuploadController.js');

router.post('/add_image', imageuploadController.single('img'),imageController.add_image );
router.post('/edit_image', imageuploadController.single('img'),imageController.edit_image );
router.get('/list_image', imageuploadController.single('img'),imageController.image_list );
router.post('/image_list_byid', imageuploadController.single('img'),imageController.image_list_byid );
router.post('/image_delete',imageController.image_delete );


module.exports = router;

