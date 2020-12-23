const jwt=require('jsonwebtoken')
const env=require('../config/env')
const {User}=require('../models/pImgRel')

module.exports.checkUser=async(req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,env.JWT_KEY)
            const userData=await User.findOne({
                where:{email:decoded.email},
                attributes:['id','email','first_name','last_name','user_status']
            })
            if(userData.email&&(userData.user_status==='active')){
                req.userData=userData
                next()
            }else{
                return res.status(401).json({
                    message:'Auth failed'
                })
            }
        }else{res.status(401).json({message:'token not present in header'})}
    } catch (error) {
        return res.status(401).json({
            message:'Auth failed'
        })
    }
}


module.exports.checkAdmin=async(req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,env.JWT_KEY)
            const userData=await User.findOne({where:{email:decoded.email},attributes:['email','user_type']})
            console.log(userData)
            if(userData.user_type==='admin'){
                req.userData=userData
                next()
            }else{
                return res.status(401).json({
                    message:'Auth failed'
                })
            }
        }else{res.status(401).json({message:'token not present in header'})}
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:'Auth failed'
        })
    }
}