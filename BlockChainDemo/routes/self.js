var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('myself',{acc:req.session.acc,balance:req.session.balance});
  console.log(req.session)
  });
  module.exports = router;