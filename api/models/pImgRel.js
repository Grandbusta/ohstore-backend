const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')
const Product=require('./productModel')
const proImg=require('./proImgModel')
const Review = require('./reviewModel')
const User=require('./userModel')

Product.hasMany(proImg)
Product.hasMany(Review)
Review.belongsTo(User)

module.exports={Product,proImg,Review}