const mysql =require('mysql');

const config={
    host: 'localhost',
    password: 'busta',
    user: 'root',
    database: 'ohwears'
}

const connectDB = mysql.createConnection(config);

module.exports=connectDB;