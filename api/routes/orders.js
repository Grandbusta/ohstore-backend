const express=require('express');
const router = express.Router();
const Order=require('../controllers/orders')
const checkAuth=require('../middlewares/checkAuth')

router.post('/',checkAuth,Order.createOrder)
router.get('/:email',Order.userOrders)

module.exports=router

