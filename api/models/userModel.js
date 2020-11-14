const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')

const User=sq.define('User',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    first_name:{type:DataTypes.STRING,allowNull:false},
    last_name:{type:DataTypes.STRING,allowNull:false},
    user_status:{type:DataTypes.ENUM,values:['active','disabled','deleted'],defaultValue:'active'},
    user_type:{type:DataTypes.ENUM,values:['user','admin','moderator'],defaultValue:'user'},
    password_hash:{type:DataTypes.STRING,allowNull:false}
},{
    tableName:'users'
})

module.exports=User