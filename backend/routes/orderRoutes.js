const express = require('express');
const {newOrder, dispatchOrder, dropOrder} = require('../controllers/ordersController');

const router = express.Router();

router.post('/newOrder', newOrder);
router.patch('/dispatchOrder/:orderId', dispatchOrder);
router.patch('/dropOrder/:orderId', dropOrder);

module.exports = router;