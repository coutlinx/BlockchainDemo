
var mysql = require('mysql');   
var pool = mysql.createPool({
    connectionLimit:4,
    host:'',
    user:'root',
    database:'BLD',
    password:'121',
    queueLimit:8
});

module.exports = pool;