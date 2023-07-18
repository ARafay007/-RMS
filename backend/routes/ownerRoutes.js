const express = require("express");
const {protect} = require('../controllers/authController');
const { shopLogin, shopRequest, addMenu, addMoreItemsInMenu, getMenu, getRestaurantsRelatedLocation } = require("../controllers/ownerController");

const router = express.Router();

router.post('/shopRequest', shopRequest);
router.post('/login', shopLogin);

router.get('/getMenu/:ownerId', getMenu);
router.patch('/addMenu/:ownerId', addMenu);
router.patch('/addMoreItems/:ownerId', addMoreItemsInMenu);
router.get('/restaurantList/:location', protect, getRestaurantsRelatedLocation);

module.exports = router;