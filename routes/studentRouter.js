const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller');

router.post('/add-student', studentController.add_student);
router.get('/list-students', studentController.student_list);
router.post('/student_update', studentController.student_update);
router.get('/student_list_byid', studentController.student_list_byid);
router.post('/student_delete', studentController.student_delete);

module.exports = router;
