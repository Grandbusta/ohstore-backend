const express=require('express');
const router = express.Router();
const Product=require('../controllers/product')

router.get('/',Product.getAllProduct)
router.get('/:slug',Product.getProduct)
router.post('/',Product.createProduct)

module.exports=router;

