const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')
const Product=require('./productModel')
const proImg=require('./proImgModel')
const Review = require('./reviewModel')
const User=require('./userModel')
const Category=require('./categoryModel')
const Delivery=require('./deliveryModel')
const Order=require('./ordersModel')

Product.hasMany(proImg,{as:'product_images'})
Product.hasMany(Review)

const pro_cat=sq.define('pro_cat',{
    ProductId:{type:DataTypes.INTEGER,allowNull:false,references:{model:Product,key:'id'}},
    categoryId:{type:DataTypes.INTEGER,allowNull:false,references:{model:Product,key:'id'}}
},{tableName:'pro_cat'})

const user_orders=sq.define('user_orders',{})
const pro_order=sq.define('pro_order',{qty:{type:DataTypes.INTEGER,allowNull:false}})
Review.belongsTo(User)
User.hasMany(Delivery)
User.belongsToMany(Order,{through:user_orders})
Order.hasOne(Delivery)
Order.belongsTo(User)
Product.belongsToMany(Category,{through:pro_cat})
Category.belongsToMany(Product,{through:pro_cat})
Order.belongsToMany(Product,{through:pro_order})
Product.belongsToMany(Order,{through:pro_order})




module.exports={Product,User,Delivery,proImg,Review,Category,Delivery,Order,pro_cat,user_orders,pro_order}