const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')

const Product=sq.define('Product',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    title:{type:DataTypes.STRING,allowNull:false,},
    slug:{type:DataTypes.STRING,allowNull:false,unique:true},
    featured_imgurl:{type:DataTypes.STRING},
    content:{type:DataTypes.TEXT},
    selling_price:{type:DataTypes.DOUBLE},
    bonus_price:{type:DataTypes.DOUBLE},
    product_status:{type:DataTypes.ENUM,values:['draft','trash','published'],defaultValue:'published'},
},{
    tableName:'products'
})

module.exports=Product