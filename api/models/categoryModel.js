const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')

const Category=sq.define('categories',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    cat_name:{type:DataTypes.STRING,allowNull:false,unique:true},
},{
    tableName:'categories'
})

module.exports=Category