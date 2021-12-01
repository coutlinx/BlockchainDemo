var express = require('express')
var router = express.Router()
var method = require('../config/methodConfig')
var middle = require('../Web3js/middle')
var account
router.get('/', async function (req, res, next) {
  console.log(account)
  if (account == undefined) {
    res.render('recharg', { Token: 0 })
  } else {
    token = await method.GetTokenBalance(account)
    res.render('recharg', { Token: token })
  }
})
router.post('/values', (req, res) => {
  console.log(req.body.acc, req.body.Balance)
  middle
    .RechargeToken(req.body.acc, req.body.Balance)
    .then((acc) => {
      res.json({ statu: acc })
    })
    .catch(console.log)
})
router.post('/token', (req, res) => {
  console.log(req.body)
  middle.GetTokenBalance(req.body.acc).then((token) => {
    res.json({ token: token })
  })
})
// router.post('/',(req,res)=>{
//   console.log(req.body);
//   account = req.body.acc;
// })

module.exports = router
