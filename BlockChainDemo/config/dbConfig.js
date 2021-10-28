
var mysql = require('mysql');   
var pool = mysql.createPool({
    connectionLimit:4,
    host:'',
    user:'root',
    database:'BLD',
    password:'121',
    queueLimit:8
});

let Query = (query,arry,callback)=>{
    pool.getConnection((err,connect)=>{
        if (err){
            console.log(err);
        }else{
            connect.query(query,arry,(err,result)=>{
                if(err){
                    callback(err)
                }else{
                    callback(null,result);
                }
            })
        }
        connect.release();
    })
}
module.exports = {pool,Query};