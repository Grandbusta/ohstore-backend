const db=require('../config/db-func')

const product=async(req,res,next)=>{
    const columns=[
        'products.id','products.title','slug',
        'featured_imgurl','selling_price','bonus_price',
        'products.created_at','categories.cat_name'
    ]
    const query="select ?? as ?? from ?? inner join ?? on ??=?? inner join ?? on ??=?? where ??=? order by products.created_at desc"
    try {
        let appProducts=await db.fire(
            query,
            [columns,
            "product_category","products","cat_product_rel",
            "products.id","cat_product_rel.product_id","categories",
            "categories.id","cat_product_rel.cat_id","products.product_status","published"
            ]
        )
        res.status(200).json({
            success:true,
            data:appProducts
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"request not successful"
        })
    }
}


const oneProduct=async(req,res,next)=>{
    const slug=req.params.slug
    let existQuery="select ?? from products where ??=?"
    let existInfo=await db.fire(existQuery,['id','products.slug',slug])
    if(existInfo.length){
        try {
        let productId=existInfo[0].id
        let imgquery="select pro_images.id,pro_images.imageurl,pimg_product_rel.alt_text from products inner join pimg_product_rel on products.id=pimg_product_rel.product_id inner join pro_images on pro_images.id=pimg_product_rel.image_id where products.product_status=? and products.id=?"
        let images=await db.fire(imgquery,["published",productId])
        let dataQuery="select products.slug,products.id,products.title,content,featured_imgurl,selling_price,bonus_price,products.created_at,cat_name as product_category from products inner join cat_product_rel on products.id=cat_product_rel.product_id inner join categories on categories.id=cat_product_rel.cat_id where products.product_status=? and products.id=?"
        let data=await db.fire(dataQuery,["published",productId])
        const reviewColumn=["reviews.id","users.first_name","users.last_name",
        "reviews.title","reviews.content","reviews.rating","reviews.created_at"]
        let reviewQuery="select ?? from ?? inner join ?? on ??=?? inner join ?? on ??=?? where ??=? and ??=?"
        let reviews=await db.fire(reviewQuery,[reviewColumn,
            'reviews','products','products.id','reviews.product_id',
            'users','users.id','reviews.user_id','products.product_status',
            "published",'products.id',productId])
        res.status(200).json({
            success:true,
            request:{
                type:'GET',
                url:`http://localhost:9000/products/${data[0].slug}`
            },
            data:{
                id:data[0].id,
                title:data[0].title,
                slug:data[0].slug,
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
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"request not sucessful"
            })
        }    
    }else{
        res.status(404).json({
            success:true,
            message:'Not found'
        })
    }
}

module.exports={
    product,
    oneProduct
}