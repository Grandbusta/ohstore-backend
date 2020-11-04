const db=require('../config/db-func')

const product=async(req,res,next)=>{
    const query="select products.id,products.title,slug,featured_imgurl,selling_price,bonus_price,products.created_at,cat_name as product_category from products join cat_product_rel on products.id=cat_product_rel.product_id where products.product_status=?"
    let appProducts=await db.fire(query,["published"])
    res.status(200).json({
        success:true,
        data:appProducts
    })
}


const oneProduct=async(req,res,next)=>{
    const slug=req.params.slug
    let existQuery="select id from products where products.slug=?"
    let existInfo=await db.fire(existQuery,["gas-cooker"])
    if(existInfo.length){
        
    }
    console.log(existInfo)
    let imgquery="select image_url from products join pimg_product_rel on products.id=pimg_product_rel.product_id where products.product_status=? and products.slug=?"
    let images=await db.fire(imgquery,["published","food-for-thought"])
    let dataQuery="select products.title,content,featured_imgurl,selling_price,bonus_price,products.created_at,cat_name as product_category from products join cat_product_rel on products.id=cat_product_rel.product_id where products.product_status=? and products.slug=?"
    let data=await db.fire(dataQuery,["published","food-for-thought"])
    let reviewQuery="select users.username,reviews.title,reviews.content,reviews.rating,reviews.created_at from reviews inner join products on products.id=reviews.product_id inner join users on users.id=reviews.user_id where products.product_status=? and products.slug=?"
    let reviews=await db.fire(reviewQuery,["published","gas-cooker"])
    res.status(200).json({
        success:true,
        data:{
            title:data[0].title,
            content:data[0].content,
            featured_imgurl:data[0].featured_imgurl,
            selling_price:data[0].selling_price,
            bonus_price:data[0].bonus_price,
            created_at:data[0].created_at,
            category:data[0].product_category,
            images:[...images],
            reviews

        }
    })
}

module.exports={
    product,
    oneProduct
}