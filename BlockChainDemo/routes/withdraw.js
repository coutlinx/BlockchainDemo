var express = require('express');
var router = express.Router();
var middle = require('../Web3js/middle')
router.get('/', function(req, res, next) {
    res.render('withdraw')
  });
  router.post('/',(req,res)=>{
    console.log(req.body);
    middle
  })
  module.exports = router;
  