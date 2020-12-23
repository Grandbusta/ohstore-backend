const {Order,Product,User,Delivery,user_orders,pro_order}=require('../models/pImgRel')
const sendMail=require('../utils/sendMail')

const createOrder=async(req,res,next)=>{
    const {email,firstname,lastname,phone1,address1,city,state,products}=req.body
    if(phone1&&address1&&city&&state&&products.length){
        try {
            const getUser=req.userData
            const id=products.map((prod)=>{return prod.id})
            const getProducts=await Product.findAll({
                where:{id:[...id]}
            })
            const prodDetails=JSON.parse(JSON.stringify(getProducts))
            const createOrd=await Order.create({
                trx_ref:'qbasema',
                UserId:getUser.id,
                Delivery:[
                    {
                        email:email?email:getUser.email,
                        firstname:firstname?firstname:getUser.first_name,
                        lastname:lastname?lastname:getUser.last_name,
                        phone1:phone1,
                        address1:address1,
                        city:city,
                        state:state,
                        UserId:getUser.id
                    }
                ]
            },{include:[{model:Product},{model:Delivery}]})
            const orderdet=createOrd.toJSON()
            const proarr=[]
            prodDetails.forEach((produ,index) => {
                const der={OrderId:orderdet.id,ProductId:produ.id,qty:products[index].id?products[index].qty:1}
                proarr.push(der)
            });
            await pro_order.bulkCreate(proarr)
            await user_orders.create({OrderId:orderdet.id,UserId:getUser.id})
            const getOrd=await Order.findAll({
                where:{trx_ref:'qbasema'},
                attributes:{exclude:['UserId']},
                include:[
                    {model:User,attributes:['email','first_name','last_name']},
                    {model:Product,
                        attributes:{exclude:['createdAt','updatedAt','content','product_status']},
                        through:{attributes:['qty']}
                    },
                    {model:Delivery,
                        attributes:{exclude:['UserId','OrderId','createdAt','updatedAt']}
                    }
                ]
            })
            const getit=JSON.parse(JSON.stringify(getOrd))

            res.status(200).json({
                order:getit
            })

            const name='Busta'
            const info={
                address:'bustajay30@gmail.com',
                title:'Your order has been Placed',
                content:`<h1>Your order has been created sucessfully by ${name}</h2>`
            }
            try {
                const seno=await sendMail(info)
                if(seno.messageId){
                    console.log(seno)
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            res.status(500).json({
                message:'An error occured'
            })
            
        }
    }else{
        res.status(400).json({
            message:'please pass the necessary values'
        })
    }

}

const userOrders=async(req,res,next)=>{
    const user=await User.findOne({
        where:{id:req.userData.id},
        attributes:['id','email','first_name','last_name'],
        include:[
            {model:Order,
            attributes:{exclude:['UserId']},
            through:{attributes:[]},
            include:[
                {model:Product,
                attributes:{exclude:['createdAt','updatedAt','content','product_status']},
                through:{attributes:[]}
            }
        ]
    }
        ]
    })
    res.status(200).json({
        data:user
    })
}

const cancelOrder=async(req,res,next)=>{
    try {
    await Product.update(
        {order_status:'cancelled'},
        {where:{id:req.params.id}}
      )
    } catch (error) {
        res.status(500).json({
            message:'An error occured'
        })
    }
}


module.exports={
    createOrder,
    userOrders,
    cancelOrder
}