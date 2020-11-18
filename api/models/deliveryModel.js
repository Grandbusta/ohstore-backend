const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')

const Delivery=sq.define('Delivery',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    email:{type:DataTypes.STRING,allowNull:false},
    firstname:{type:DataTypes.STRING,allowNull:false},
    lastname:{type:DataTypes.STRING,allowNull:false},
    phone1:{type:DataTypes.STRING,allowNull:false},
    phone2:{type:DataTypes.STRING},
    address1:{type:DataTypes.STRING,allowNull:false},
    address2:{type:DataTypes.STRING},
    city:{type:DataTypes.STRING,allowNull:false},
    state:{type:DataTypes.STRING,allowNull:false},
    save:{type:DataTypes.ENUM,values:['true','false'],defaultValue:'false'},
},{
    tableName:'delivery_details'
})

module.exports=Delivery