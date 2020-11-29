const express=require('express');
const router = express.Router();
const Product=require('../controllers/product')
const upload=require('../utils/imageUpload')

router.get('/',Product.getAllProduct)
router.get('/:slug',Product.getProduct)
router.post('/',upload.single('featured_image'),Product.createProduct)

module.exports=router;

