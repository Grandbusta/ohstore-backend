const sq=require('../config/db-config')
const {DataTypes}=require('sequelize')

const Order=sq.define('Order',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    trx_ref:{type:DataTypes.STRING},
    order_status:{type:DataTypes.ENUM,values:['processing','completed','on hold','cancelled'],defaultValue:'processing'},
    paid:{type:DataTypes.ENUM,values:['true','false'],defaultValue:'false'},
},{
    tableName:'orders'
})

module.exports=Order