const {Sequelize}=require('sequelize')
const env=require('../config/env')
const sequelize=new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {host:env.DB_HOST,dialect:'mysql'}
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