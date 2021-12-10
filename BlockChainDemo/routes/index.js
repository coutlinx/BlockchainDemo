var express = require('express')
var pool = require('../config/dbConfig')
var middle = require('../Web3js/middle')
var router = express.Router()
var method = require('../config/methodConfig')
var acc,token
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {HASH:"",Beneficiary:"",VALUE:"",HighestBider:""})
})
router.post('/', async (req, res) => {
  acc = req.body.acc 
  try {
    True = await middle.GetOwner(acc)
  } catch (e) {
    True = false
  }
  insert = await method.Readconfig()
  token = await middle.GetTokenBalance(acc)
  pool.Query(insert.DBCONFIG.QueryRep, [acc], (err, result) => {
    if (err) {
      console.log(err)
    } else if (result.length > 0) {
      console.log('sucess!')
      if(!True){
        res.json({ token: token, alert: 'name' })
      }else{
        res.json({ token: token})
      }
    } else {
      pool.Query(insert.DBCONFIG.REGISTER, [acc], (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
          res.json({ alert: 'name' })
        }
      })
    }
  })
})

router.get('/authion/:hash',async(req,res)=>{
  console.log(req.params)
  data = await middle.GetAuthion(req.params.hash)
  HighestBider = await middle.GetHibestBider(req.params.hash)
  console.log(data,HighestBider)
  res.render('index',{HASH:req.params.hash,Beneficiary:data.owner_linhao,VALUE:data.value_linhao,HighestBider:HighestBider})
})
router.post('/setOwner', (req, res) => {
  console.log(req.body)
  middle.SetOwner(req.body.name,acc).then(console.log)
  res.redirect('/')
})

router.post('/bid',async(req,res)=>{
  console.log(req.body)
  bid = await middle.ObjBit(req.body.ADDDR,req.body.HASH,req.body.VALUE);
  console.log(bid)
  res.json({BID:bid})
})

module.exports = router
