const express=require('express');
const router = express.Router();
const {newReview}=require('../controllers/reviews')


router.post('/',newReview)

module.exports=router;