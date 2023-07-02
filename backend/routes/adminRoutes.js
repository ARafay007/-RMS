const express = require('express');
const {createRestaurant} = require('../controllers/adminController');

const router = express.Router();

router.patch('/createRestaurant/:ownerId', createRestaurant);

module.exports = router;