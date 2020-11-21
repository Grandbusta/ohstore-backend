const express=require('express');
const router = express.Router();
const Categories=require('../controllers/category')

router.post('/',Categories.createCategory)

module.exports=router;