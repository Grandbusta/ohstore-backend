const db = require('../config/db-config');

exports.fire = (sqlQuery,params = []) => {
    return new Promise((resolve,reject)=>{
        db.query(sqlQuery,params,(err,res)=>{
            if(err) reject (err);
            resolve(res)
        })
    })
}