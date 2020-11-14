const db=require('../config/db-func')
const {Product,proImg,Review}=require('../models/pImgRel')

const product=async(req,res,next)=>{
    const fins=await Product.findAll()
    const data=JSON.parse(JSON.stringify(fins))
    res.status(200).json({
        data
    })
    // const columns=[
    //     'products.id','products.title','slug',
    //     'featured_imgurl','selling_price','bonus_price',
    //     'products.created_at','categories.cat_name'
    // ]
    // const query="select ?? as ?? from ?? inner join ?? on ??=?? inner join ?? on ??=?? where ??=? order by products.created_at desc"
    // try {
    //     let appProducts=await db.fire(
    //         query,
    //         [columns,
    //         "product_category","products","cat_product_rel",
    //         "products.id","cat_product_rel.product_id","categories",
    //         "categories.id","cat_product_rel.cat_id","products.product_status","published"
    //         ]
    //     )
    //     res.status(200).json({
    //         success:true,
    //         data:appProducts
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         success:false,
    //         message:"request not successful"
    //     })
    // }
}


const oneProduct=async(req,res,next)=>{
    const slug=req.params.slug;
    const fins=await Product.findOne({where:{slug:slug},include:[{model:proImg,attributes:['id','imageurl']},{model:Review}]})
    const data=JSON.parse(JSON.stringify(fins))
    if(data!==null){
        res.status(200).json({
            data
        })
    }else{
        res.status(404).json({
            message:'Not found'
        })
    }
}

module.exports={
    product,
    oneProduct
}