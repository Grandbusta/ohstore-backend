const {Product,proImg,Review,Category,pro_cat, User}=require('../models/pImgRel')
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
                {model:Review,
                    attributes:{exclude:['ProductId','UserId','updatedAt']},
                    include:[{model:User,attributes:['first_name','last_name']}]
                },
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
    if(files){
        for(const file of files){
            try {           
                const {path}=file
                const uploadFile= await cloudinary.uploads(path,'OhstoreImgs')
                urls.push({imageurl:uploadFile.url})
                fs.unlinkSync(path)
            } catch (error) {
                console.log('error occured while uploading')
            }
        }
    }

    const {title,content,selling_price,bonus_price,categories}=req.body
    let stDate=Date.now()
    if(title){
        const findCat=await Category.findAll({where:{cat_name:categories?categories:null}})
        const catResult=JSON.parse(JSON.stringify(findCat))
        console.log(catResult)
        let oslug=title.replace(/[^A-Za-z0-9\s]/gi,'').toLowerCase().split(' ')
        slug=''
        for(i=0;i<7;i++){slug+=`${oslug[i]}-`}
          const data={
              title:title,
              slug:`${slug}${stDate}`,
              featured_imgurl:urls.length?urls[0].imageurl:'',
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
}


const deleteProduct=async(req,res,next)=>{
    const {id}=req.params
    try {
        await Product.destroy({where:{id:id}})
        res.status(202).json({
            message:'Product deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message:'An error occured'
        })
    }
}


const updateProduct=async(req,res,next)=>{
    try {
        await Product.update(
            {...req.body},
            {where:{id:req.params.id}}
        )
        res.status(200).json({
            message:'Product updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message:'An error occured'
        })
    }
}

module.exports={
    getAllProduct,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
}