const express=require('express');
const router = express.Router();
const {newReview}=require('../controllers/reviews')
const {checkUser}=require('../middlewares/checkAuth')


router.post('/',checkUser,newReview)

module.exports=router;