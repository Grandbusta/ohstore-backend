const express=require('express');
const router = express.Router();
const Order=require('../controllers/orders')

router.post('/',Order.createOrder)
router.get('/:email',Order.userOrders)

module.exports=router

