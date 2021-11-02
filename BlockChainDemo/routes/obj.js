var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  console.log(req.session)
    res.render('object')
  });
  module.exports = router;