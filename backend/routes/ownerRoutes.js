const express = require("express");
const { shopRequest } = require("../controllers/ownerController");

const router = express.Router();

router.post('/shopRequest', shopRequest);

module.exports = router;