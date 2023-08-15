const express = require("express");
const {protect} = require('../controllers/authController');
const { 
  shopLogin, 
  shopRequest, 
  addMenu, 
  addMoreItemsInMenu, 
  getMenu, 
  getRestaurantsRelatedLocation, 
  getLoggedInUserData } = require("../controllers/ownerController");

const router = express.Router();

router.post('/shopRequest', shopRequest);
router.post('/login', shopLogin);

router.get('/getLoggedInUserData/:id', protect, getLoggedInUserData);

router.get('/getMenu/:ownerId/:category', getMenu);
router.patch('/addMenu/:ownerId', protect, addMenu);
router.patch('/addMoreItems/:ownerId', addMoreItemsInMenu);
router.get('/restaurantList/:location', protect, getRestaurantsRelatedLocation);

module.exports = router;