var express = require('express');
var pool = require('../config/dbConfig');
var router = express.Router();
var identity = "admin"
var method = require("../config/methodConfig")

router.get('/', function(req, res, next) {
  res.render('more',{identity:identity})
    console.log(req.body)
  });
  router.post('/',async (req,res)=>{
    console.log(req.body)
    insert = await method.Readconfig()
    pool.Query(insert.DBCONFIG[0].IDENTITY,[req.body.acc],(err,reas)=>{
      if(err){
        console.log(err)
      }else{
        identity= reas[0].role
        console.log(identity)
      }
    })
    res.redirect("/")
  })
  router.post("/setIdentity",(req,res)=>{
    console.log(req.body);
  })
  module.exports = router;