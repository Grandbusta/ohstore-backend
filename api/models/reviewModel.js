const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')

const Review=sq.define('review',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    title:{type:DataTypes.STRING,allowNull:false},
    content:{type:DataTypes.STRING,allowNull:false},
    rating:{type:DataTypes.ENUM,values:['1','2','3','4','5'],allowNull:false},
},{
    tableName:'reviews'
})

module.exports=Review