const {Review}=require('../models/pImgRel')
const newReview=async(req,res,next)=>{
    const newRev=await Review.create({
        title:'Good product',
        content:'Product served me so well',
        rating:'4',
        UserId:1,
        ProductId:3
    })
    console.log(JSON.stringify(newRev))
    res.status(200).json({
        message:'review created'
    })
}


module.exports={newReview}