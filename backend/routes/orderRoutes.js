const express = require('express');
const {addOrder, dispatchOrder, dropOrder} = require('../controllers/ordersController');

const router = express.Router();

router.post('/addOrder', addOrder);
router.patch('/dispatchOrder/:orderId', dispatchOrder);
router.patch('/dropOrder/:orderId', dropOrder);

module.exports = router;