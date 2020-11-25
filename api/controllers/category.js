const {Category} =require('../models/pImgRel')

const createCategory=async(req,res,next)=>{
    const {category_name}=req.body
    try {
        if(category_name){
        const slug=category_name.replace(/[^A-Za-z0-9\s]/gi,'').toLowerCase().replace(/[\s]/g,'-')
        const findCat=await Category.findOne({where:{slug:slug}})
        if(!findCat){
          const category=await Category.create({
            cat_name:category_name,
            slug:slug
          })
          res.status(201).json({
            message:'category created successfully',
            data:{
              category_name:category.cat_name,
              category_slug:category.slug,
              createdAt:category.createdAt
            }
          })
        }else{res.status(409).json({
          message:'category already exist'
        })}
      }else{
        res.status(400).json({
          message:'category_name not present in request'
        })
      }
    } catch (error) {
      res.status(500).json({
        message:'an error occured'
      })
    }
}


const deleteCategory=async(req,res)=>{
    const delCat=await Category.destroy({where:{cat_name:req.params.category}})
    console.log(delCat)
}

module.exports={
    createCategory,
    deleteCategory
}