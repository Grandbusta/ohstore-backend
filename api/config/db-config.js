const {Sequelize}=require('sequelize')
const sequelize=new Sequelize('ohwears','root','busta',{host:'localhost',dialect:'mysql'})

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