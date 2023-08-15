const express = require('express');
const {createRestaurant, signUpAdmin} = require('../controllers/adminController');

const router = express.Router();

router.post('/signup', signUpAdmin);
router.patch('/createRestaurant/:ownerId', createRestaurant);

module.exports = router;