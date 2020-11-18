const bcrypt = require('bcrypt');
const validate=require('email-validator')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const login=async (req,res,next)=>{
		const {email,password}=req.body
		if(email&&password){
			let validateEmail=validate.validate(email)
			if(validateEmail){
				try {
					let check=await User.findOne({where:{email:email},attributes:['email','password_hash']})
					if(check!==null){
						data=check.toJSON()
						let comparePassword=await bcrypt.compare(password,data.password_hash)
						if(comparePassword){
							const token=jwt.sign({
								email:data.email
							},'MUST_SIGN',{expiresIn:'1h'})
							res.status(200).json({
								message:'Auth successful',
								token:token
							})
						}else{
							res.status(400).json({
								message:'Auth failed'
							})
						}
					}else{
						res.status(404).json({
							message:'user not found'
						})
					}
				} catch (error) {
					console.log(error)
					res.status(500).json({
						message:'An error occured'
					})
				}
			}else{
				res.status(400).json({
					message:"not a valid email"
				})
			}

		}else{
			res.status(400).json({
				message:"one or more values are missing"
			})
		}
}

const signup=async (req,res,next)=>{
    const {email,firstname,lastname,password}=req.body
    if(email&&firstname&&lastname&&password){
        let validEmail=validate.validate(email)
        if(validEmail){
					try {
						let check=await User.findOne({where:{email:email},attributes:['email']})
						if(check!==null){
							res.status(201).json({
								message:'user already exist'
							})
						}else{
							let password_hash=await bcrypt.hash(password,10)
							let values={
								email:email,
								first_name:firstname,
								last_name:lastname,
								password_hash:password_hash
							}
							let createUser=await User.create(values)
							if(createUser){
								res.status(200).json({
									status:"success",
									message:'user created successfully'
								})
							}else{
								res.status(401).json({
									status:"failed",
									message:'user signup failed'
								})
							}
						}
					} catch (error) {
						console.log(error.message)
						res.status(500).json({
							status:"error",
							message:"an error occured"
						})
					}
				}else{
				res.status(401).json({
					message:'email is not valid'
				})
				}
    }else{
        res.status(401).json({
					message:'one or more values is missing'
				})
    }
}

module.exports={
    signup,
    login
}