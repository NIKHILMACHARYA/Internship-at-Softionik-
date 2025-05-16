const express = require('express');
const router = express.Router();
const test = require('../controllers/testController');

router.post('/add_data', test.add_data);
router.post('/add_employee', test.add_employee);
router.get('/employee_list', test.employee_list);
router.post('/employee_list_byid', test.employee_list_byid);
router.post('/employee_update', test.employee_update);
router.post('/employee_delete', test.employee_delete);

module.exports = router;   
