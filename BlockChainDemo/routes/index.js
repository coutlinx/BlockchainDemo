var express = require('express');
var web3 = require('web3');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',(req,res)=>{
  self = {
    acc:req.body.acc,
    balance:req.body.Balance
  }
  req.session.self = self;
  console.log(req.session)
})
module.exports = router;
