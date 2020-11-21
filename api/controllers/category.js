const {Category} =require('../models/pImgRel')

const createCategory=async(req,res,next)=>{
    const {category_name}=req.body
    if(category_name){
      const category=await Category.create({cat_name})
      res.status(201).json({
        message:'category created successfully',
        data:{
          category_name:category.cat_name,
          createdAt:category.createdAt
        }
      })
    }else{
      res.status(400).json({
        message:'category_name not present in request'
      })
    }
}

module.exports={
    createCategory
}