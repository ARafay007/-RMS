const express = require("express");
const { shopRequest, addMenu } = require("../controllers/ownerController");

const router = express.Router();

router.post('/shopRequest', shopRequest);
router.patch('/addMenu/:ownerId', addMenu);

module.exports = router;