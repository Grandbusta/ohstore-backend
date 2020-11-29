const {Product,proImg,Review,Category,pro_cat}=require('../models/pImgRel')
const sendMail=require('../utils/sendMail')
const cloudinary=require('../config/cloudinary')
const fs=require('fs')

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
    const urls=[]
    const files=req.files
    if(files.length){
        for(const file of files){
            const {path}=file
            const uploadFile= await cloudinary.uploads(path,'OhstoreImgs')
            urls.push({imageurl:uploadFile.url})
            fs.unlinkSync(path)
        }
    }

    console.log(urls)
    const {title,content,selling_price,bonus_price,categories}=req.body
    let stDate=Date.now()
    if(title){
        const findCat=await Category.findAll({where:{cat_name:categories?categories:null}})
        const catResult=JSON.parse(JSON.stringify(findCat))
        console.log(catResult)
        let slug=title.replace(/[^A-Za-z0-9\s]/gi,'').toLowerCase().replace(/[\s]/g,'-')
          const data={
              title:title,
              slug:`${slug}-${stDate}`,
              featured_imgurl:urls.length?urls[0].url:'',
              content:content?content:'',
              selling_price:selling_price?selling_price:0.00,
              bonus_price:bonus_price?bonus_price:0.00,
              product_images:urls.length?[...urls]:[]
          }
          let createPro=await Product.create(data,{include:[{model:proImg,as:'product_images'}]})
          const productDetails=createPro.toJSON()
          const catArr=[]
          if(catResult.length&&productDetails){
            catResult.forEach(caty=>{
              catArr.push({ProductId:productDetails.id,categoryId:caty.id})
            })
            await pro_cat.bulkCreate(catArr)
          }
          res.status(200).json({
              message:'Product created successfully',
          })
      
    }else{
        res.status(400).json({
            message:'title cannot be empty'
        })
    }
    // const name='Busta'
    // const info={
    //     address:'bustajay30@gmail.com',
    //     title:'Your order has been cancelled',
    //     content:`<h1>Your order has been created sucessfully by ${name}</h2>`
    // }
    // const seno=await sendMail(info)
    // if(seno.messageId){
    //     console.log(seno)
    // }
}

module.exports={
    getAllProduct,
    getProduct,
    createProduct
}