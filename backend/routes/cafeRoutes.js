const express = require('express');
const {
    getCafes,
    createCafe,
    updateCafe,
    deleteCafe
} = require('../controllers/cafeController');

const router = express.Router();

// Route to GET all cafes or filter by location
router.get('/', getCafes);

// Route to create a new cafe
router.post('/', createCafe);

// Route to update an existing cafe
router.put('/', updateCafe);

// Route to delete an existing cafe
router.delete('/', deleteCafe);

module.exports = router;

