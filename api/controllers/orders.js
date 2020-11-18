const {Order,Product,User,Delivery,user_orders,pro_order}=require('../models/pImgRel')
const product = require('./product')

const createOrder=async(req,res,next)=>{
    const getUser=await User.findOne({where:{email:'lipoo@mail.com'}})
    const user=getUser.toJSON();
    const getProducts=await Product.findAll({
        where:{slug:['wave','newone']}
    })
    const prodDetails=JSON.parse(JSON.stringify(getProducts))
    console.log(prodDetails);
    const createOrd=await Order.create({
        trx_ref:'bisiwa',
        UserId:user.id,
        Delivery:[
        {
            email:'bolk@gmail.com',
            firstname:'grand',
            lastname:'busta',
            phone1:'08105889617',
            address1:'taki hostel',
            city:'ibadan',
            state:'oyo',
            UserId:user.id
        }
        ]
    },{include:[{model:Product},{model:Delivery}]})
    const orderdet=createOrd.toJSON()
    const proarr=[]
    prodDetails.forEach(produ => {
        const der={OrderId:orderdet.id,ProductId:produ.id}
        proarr.push(der)
        
    });
    console.log(proarr)
    const ele=await pro_order.bulkCreate(proarr)
    console.log(ele)
    await user_orders.create({OrderId:orderdet.id,UserId:user.id})
    const getOrd=await Order.findAll({
        where:{trx_ref:'bisiwa'},
        attributes:{exclude:['UserId']},
        include:[
            {model:User,attributes:['email','first_name','last_name']},
            {model:Product,
                attributes:{exclude:['createdAt','updatedAt','content','product_status']},
                through:{attributes:[]}
            },
            {model:Delivery,
                attributes:{exclude:['UserId','OrderId','createdAt','updatedAt']}
            }
        ]
    })
    const getit=JSON.parse(JSON.stringify(getOrd))
    res.status(200).json({
        getit
    })
}

const userOrders=(req,res,next)=>{

}

module.exports={
    createOrder,
    userOrders
}