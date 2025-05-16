const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller');

router.post('/add-student', studentController.add_student);
router.get('/list-students', studentController.student_list);
router.post('/student_update', studentController.student_update);

module.exports = router;