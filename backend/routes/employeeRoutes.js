const express = require('express');
const {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

// Route to GET all employees or filter by cafe
router.get('/', getEmployees);

// Route to create a new employee
router.post('/', createEmployee);

// Route to update an existing employee
router.put('/', updateEmployee);

// Route to delete an existing employee
router.delete('/', deleteEmployee);

module.exports = router;

