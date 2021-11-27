var express = require('express');
var router = express.Router();
var method = require("../config/methodConfig")
var middle = require('../Web3js/middle')
var account 
router.get('/',async function(req, res, next) {
  console.log(account)
  if(account == undefined){
    res.render('recharg',{Token:0});
  }else{
    token = await method.GetTokenBalance(account)
    res.render('recharg',{Token:token});
  }
 
  });
  router.post('/',(req,res)=>{
    console.log(req.body);
    account = req.body.acc;
  })
  router.post('/value',(req,res)=>{
    middle.
  })
  module.exports = router;