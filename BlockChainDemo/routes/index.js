var express = require('express')
var pool = require('../config/dbConfig')
var middle = require('../Web3js/middle')
var router = express.Router()
var method = require('../config/methodConfig')
var acc,token
/* GET home page. */
router.get('/', async function(req, res,) {
  pool.Select("select Hash from authion",async (err,result)=>{
    if(err){
      console.log(err)
    }else{
      let temp= 0
      let value = 0
      let Hash = ""
      for(let i =0;i<result.length;i++){
        value = await middle.GetHighestAuthion(result[i].Hash)
        if(value > temp){
          temp = value
          Hash = result[i].Hash
        }
        console.log(result[i].Hash)
      }
      HighestBider = await middle.GetHibestBider(Hash)
      HighestBid = await middle.GetHibest_bid_linhao(Hash)
      data = await middle.GetAuthion(Hash)
      if(HighestBid ==0){
        res.render('index', {HASH:Hash,Beneficiary:data.owner_linhao,VALUE:HighestBid,HighestBider:HighestBider})
      }else{
        res.render('index', {HASH:Hash,Beneficiary:data.owner_linhao,VALUE:temp,HighestBider:HighestBider})
      }
      
    }
  })
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
  HighestBid = await middle.GetHibest_bid_linhao(req.params.hash)
  console.log(data,HighestBider)
  console.log(HighestBid,data.value_linhao)
  // res.render('index',{HASH:req.params.hash,Beneficiary:data.owner_linhao,VALUE:HighestBid,HighestBider:HighestBider})
  if(HighestBid != 0){
    res.render('index', {HASH:req.params.hash,Beneficiary:data.owner_linhao,VALUE:HighestBid,HighestBider:HighestBider})
  }else{
    res.render('index', {HASH:req.params.hash,Beneficiary:data.owner_linhao,VALUE:data.value_linhao,HighestBider:HighestBider})
  }
})
router.post('/setOwner', (req, res) => {
  console.log(req.body)
  middle.SetOwner(req.body.name,acc).then(console.log)
  res.redirect('/')
})

router.post('/bid',async(req,res)=>{
  console.log(req.body)
  var bid
  try{
    bid = await middle.ObjBit(req.body.ADDDR,req.body.HASH,req.body.VALUE);
  }catch(e){
    console.log(e.data.stack)
    res.json({err:e})
  }finally{
    pool.Query("insert into addauthion (user,authion,money) values((select ID from user where address = ?),(select id from authion where Hash = ?),?)",[req.body.ADDDR,req.body.HASH,req.body.VALUE],(err,result)=>{
      if (err){
        console.log(err)
      }else{
        console.log(result)
      }
    })

  }
  // console.log(bid)
})

module.exports = router
