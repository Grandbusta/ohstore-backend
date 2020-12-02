const express=require('express');
const router = express.Router();
const Order=require('../controllers/orders')
const {checkUser,checkAdmin}=require('../middlewares/checkAuth')

router.post('/',checkUser,Order.createOrder)
router.get('/',checkUser,Order.userOrders)

//Only admin can cancel order
router.patch('/:id',checkAdmin,Order.cancelOrder)

module.exports=router

