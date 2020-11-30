const express=require('express');
const router = express.Router();
const Product=require('../controllers/product')
const upload=require('../utils/imageUpload')
const {checkAdmin}=require('../middlewares/checkAuth')

router.get('/',Product.getAllProduct)
router.get('/:slug',Product.getProduct)
router.post('/',checkAdmin,upload.array('product_images'),Product.createProduct)

module.exports=router;

