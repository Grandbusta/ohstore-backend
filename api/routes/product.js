const express=require('express');
const router = express.Router();
const Product=require('../controllers/product')

router.get('/',Product.product)
router.get('/:slug',Product.oneProduct)

module.exports=router;

