var express = require('express');
var pool = require('../config/dbConfig');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('register')
  });
router.post('/',(req,res)=>{
    console.log(req.body);
    pool.getConnection((err,connect)=>{
        if(err){
            console.log(err);
        }else{
            connect.query("show databases",(err,results)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(results);
                }
            })
        }
        connect.release();
    })
})
  module.exports = router;