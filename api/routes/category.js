const express=require('express');
const router = express.Router();
const Categories=require('../controllers/category')

router.post('/',Categories.createCategory)
router.delete('/:category',Categories.deleteCategory)

module.exports=router;