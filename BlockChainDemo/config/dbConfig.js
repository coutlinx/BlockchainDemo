
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit:4,
    host:'',
    user:'root',
    database:'BLD',
    password:'102400',
    queueLimit:20
});

let Query = async (query,arry,callback)=>{
    pool.getConnection((err,connect)=>{
        if (err){
            console.log(err);
        }else{
            connect.query(query,arry,(err,result)=>{
                if(err){
                    callback(err,null);
                }else{
                    callback(null,result);
                }
            })
        }
        connect.release();
    })
}
let Select = async (query,callback)=>{
    pool.getConnection((err,connect)=>{
        if(err){
            console.log(err);
        }else{
            connect.query(query,(err,result)=>{
                if(err){
                    callback(err,null);
                }else{
                    callback(null,result);
                }
            })
        }
    })
}
module.exports = {pool,Query,Select};