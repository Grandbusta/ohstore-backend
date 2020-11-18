const express=require('express');
const router = express.Router();
const Product=require('../controllers/product')

router.get('/',Product.product)
router.get('/:slug',Product.oneProduct)
router.post('/',Product.createProduct)
router.post('/categories',Product.categories)

module.exports=router;

