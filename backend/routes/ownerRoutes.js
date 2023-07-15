const express = require("express");
const { shopRequest, addMenu, addMoreItemsInMenu,getMenu } = require("../controllers/ownerController");

const router = express.Router();

router.get('/getMenu/:ownerId', getMenu);
router.post('/shopRequest', shopRequest);
router.patch('/addMenu/:ownerId', addMenu);
router.patch('/addMoreItems/:ownerId', addMoreItemsInMenu);

module.exports = router;