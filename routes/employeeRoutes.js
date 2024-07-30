const express = require('express');
const employeeController = require('../controller/employeeController');
const router = express.Router();

router.route('/')
    .get(employeeController.getAllEmployees);

router.route('/:id')
    .get(employeeController.getEmployeebyId);

module.exports = router;
