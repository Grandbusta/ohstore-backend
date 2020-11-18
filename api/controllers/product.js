const {Product,proImg,Review,Category,pro_cat}=require('../models/pImgRel')

const product=async(req,res,next)=>{
    const findAll=await Product.findAll({
        where:{product_status:'published'},
        include:[{model:Category,attributes:['id','cat_name'],through:{attributes:[]}}],
        order:[[Category,'createdAt','DESC']]
    })
    const data=JSON.parse(JSON.stringify(findAll))
    res.status(200).json({
        data
    })
}


const oneProduct=async(req,res,next)=>{
    const slug=(req.params.slug).toString();
    try {
        const findOne=await Product.findOne({
            where:{slug:slug},
            include:[
                {model:proImg,
                    as:'product_images',
                    attributes:['id','imageurl'],
                },
                {model:Review},
                {model:Category,
                    through:{attributes:[]},
                    attributes:['id','cat_name']
                }
            ]
        })
        const data=JSON.parse(JSON.stringify(findOne))
        if(data!==null){
            res.status(200).json({
                data
            })
        }else{
            res.status(404).json({
                message:'Not found'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'An error occured'
        })
        
    }
}

const categories=async(req,res,next)=>{
    const category=await Category.bulkCreate([{cat_name:'electronics'},{cat_name:'gadgets'}])
    const catego=JSON.parse(JSON.stringify(category))
    console.log(catego)
}

const createProduct=async (req,res,next)=>{
    const findCat=await Category.findAll({where:{cat_name:['electronics','gadgets']}})
    const catResult=JSON.parse(JSON.stringify(findCat))
    const data={
        title:'elijah',
        slug:'newone',
        featured_imgurl:'./dsa.jpg',
        content:'This is a new product that must be considered',
        selling_price:500.56,
        bonus_price:477.67,
        pro_images:[{imageurl:'./muyds.jpg'}]
    }
    let createPro=await Product.create(data,{include:[{model:proImg,as:'product_images'}]})
    const productDetails=createPro.toJSON()
    await pro_cat.create({ProductId:productDetails.id,categoryId:catResult[0].id})
    res.status(200).json({
        message:'Product created successfully'
    })
}

module.exports={
    product,
    oneProduct,
    createProduct,
    categories
}