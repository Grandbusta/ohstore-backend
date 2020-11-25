const {Product,proImg,Review,Category,pro_cat}=require('../models/pImgRel')
const sendMail=require('../utils/sendMail')

const getAllProduct=async(req,res,next)=>{
    const findAll=await Product.findAll({
        where:{product_status:'published'},
        include:[{model:Category,attributes:['id','cat_name'],through:{attributes:[]}}],
        order:[[Category,'createdAt','DESC']]
    })
    const data=JSON.parse(JSON.stringify(findAll))
    if(data.length){
            res.status(200).json({
                data
            })
    }else{
        res.status(404).json({
            message:'no product available',
        })
    }
}


const getProduct=async(req,res,next)=>{
    const {slug}=req.params
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



const createProduct=async (req,res,next)=>{
    const seno=await sendMail('bustajay30@gmail.com','Your order has been cancelled','A new dawn')
    if(seno.messageId){
        res.status(200).json({
            message:'email sent sucessfully'
        })
    }
    // const {title,content,selling_price,bonus_price,categories}=req.body
    // const date=new Date()
    // let stDate=date.toISOString()
    // if(title){
    //     const findCat=await Category.findAll({where:{cat_name:categories?categories:null}})
    //     const catResult=JSON.parse(JSON.stringify(findCat))
    //     console.log(catResult)
    //     let slug=title.replace(/[^A-Za-z0-9\s]/gi,'').toLowerCase().replace(/[\s]/g,'-')
    //       const data={
    //           title:title,
    //           slug:`${slug}-${stDate}`,
    //           featured_imgurl:'./dsa.jpg',
    //           content:content?content:'',
    //           selling_price:selling_price?selling_price:'',
    //           bonus_price:bonus_price?bonus_price:'',
    //           pro_images:[]
    //       }
    //       console.log(data)
    //       let createPro=await Product.create(data,{include:[{model:proImg,as:'product_images'}]})
    //       const productDetails=createPro.toJSON()
    //       const catArr=[]
    //       if(catResult.length&&productDetails){
    //         catResult.forEach(caty=>{
    //           catArr.push({ProductId:productDetails.id,categoryId:caty.id})
    //         })
    //         await pro_cat.bulkCreate(catArr)
    //       }
    //       res.status(200).json({
    //           message:'Product created successfully',
    //       })
      
    // }else{
    //     res.status(400).json({
    //         message:'title cannot be empty'
    //     })
    // }
}

module.exports={
    getAllProduct,
    getProduct,
    createProduct
}