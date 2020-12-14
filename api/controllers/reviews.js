const {Review,Product}=require('../models/pImgRel')

const newReview=async(req,res,next)=>{
    const {title,content,rating,slug}=req.body
    if((title&&content&&rating&&slug)&&(rating<=5&&rating>0)){
        const checkProduct=await Product.findOne({where:{slug:slug}})
        if(checkProduct){
            const checkReview=await Review.findOne({where:{UserId:req.userData.id,ProductId:checkProduct.id}})
            if(!checkReview){
                const newRev=await Review.create({
                    title:title,
                    content:content,
                    rating:rating,
                    UserId:req.userData.id,
                    ProductId:checkProduct.id
                })
                console.log(JSON.stringify(newRev))
                res.status(200).json({
                    message:'review created'
                })
            }else{res.status(202).json({message:'user cannot drop review more than once'})}
        }else{res.status(404).json({message:'Product not available'})}
    }else{res.status(400).json({message:'please pass the necessary and correct values'})}
}


module.exports={newReview}