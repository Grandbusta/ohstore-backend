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
    let existInfo=await db.fire(existQuery,[slug])
    if(existInfo.length){
        let productId=existInfo[0].id
        let imgquery="select image_url from products join pimg_product_rel on products.id=pimg_product_rel.product_id where products.product_status=? and products.id=?"
        let images=await db.fire(imgquery,["published",productId])
        let dataQuery="select products.id,slug,products.title,content,featured_imgurl,selling_price,bonus_price,products.created_at,cat_name as product_category from products join cat_product_rel on products.id=cat_product_rel.product_id where products.product_status=? and products.id=?"
        let data=await db.fire(dataQuery,["published",productId])
        let reviewQuery="select users.username,reviews.title,reviews.content,reviews.rating,reviews.created_at from reviews inner join products on products.id=reviews.product_id inner join users on users.id=reviews.user_id where products.product_status=? and products.id=?"
        let reviews=await db.fire(reviewQuery,["published",productId])
        res.status(200).json({
            success:true,
            request:{
                type:'GET',
                url:`http://localhost:9000/products/${slug}`
            },
            data:{
                id:data[0].id,
                slug:data[0].slug,
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
    }else{
        res.status(404).json({
            success:false,
            message:'Not found'
        })
    }
}

module.exports={
    product,
    oneProduct
}