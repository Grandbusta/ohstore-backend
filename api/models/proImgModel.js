const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')

const ProImages=sq.define('pro_images',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    imageurl:{type:DataTypes.STRING},
},{
    tableName:'pro_images'
})

module.exports=ProImages