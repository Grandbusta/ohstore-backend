const {Sequelize}=require('sequelize')
const {DB_NAME,DB_HOST,DB_PASSWORD,DB_USER}=require('../config/env')
const sequelize=new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {host:DB_HOST,dialect:'mysql'}
    )

check=async ()=>{
    try {
        await sequelize.authenticate()
        // sequelize.sync({alter:true})
        console.log('connected')
    } catch (error) {
        console.log('error')
    }
}
check()

module.exports=sequelize