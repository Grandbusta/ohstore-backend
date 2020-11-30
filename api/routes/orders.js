const express=require('express');
const router = express.Router();
const Order=require('../controllers/orders')
const {checkUser}=require('../middlewares/checkAuth')

router.post('/',checkUser,Order.createOrder)
router.get('/:email',checkUser,Order.userOrders)

module.exports=router

