var express = require('express')
var pool = require('../config/dbConfig')
var router = express.Router()
var mid = require('../Web3js/middle')
var identity = 'user'
var method = require('../config/methodConfig')
var acc
router.get('/', async function (req, res, next) {
  insert = await method.Readconfig()
  if (acc != undefined) {
    pool.Query(insert.DBCONFIG.IDENTITY, [acc], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        identity = result[0].role
        console.log(identity)
        res.render('more', { identity: identity })
      }
    })
  } else {
    res.render('more', { identity: identity })
  }
})
router.post('/setacc', (req, res) => {
  acc = req.body.acc
})
router.post('/setidentity', (req, res) => {
  console.log(req.body)
  if (req.body.identity == 'admin') {
    mid
      .SetAdmin(req.body.YourAddress, req.body.Address, req.body.Name)
      .then(async (ress) => {
        let query = await method.Readconfig()
        pool.Query(query, [req.body.identity, req.body.Address])
        res.render('more', { identity: identity })
      })
  } else if (req.body.identity == 'expert') {
    mid
      .SetExpre(req.body.YourAddress, req.body.Address, req.body.Name)
      .then(async (ress) => {
        let query = await method.Readconfig()
        pool.Query(query, [req.body.identity, req.body.Address])
        res.render('more', { identity: identity })
      })
  } else {
    mid.SetOwner(req.body.Name, req.body.Address).then(async (ress) => {
      let query = await method.Readconfig()
      pool.Query(query, [req.body.identity, req.body.Address])
      res.render('more', { identity: identity })
    })
  }
})
router.post('/GetUnstartauthion', async(req, res) => {
    query = await method.Readconfig()
  pool.Select(query.DBCONFIG.GetUnstartauthion,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(JSON.stringify(result))
      res.json({"Authion":JSON.stringify(result)})
    }
  })
})
router.post('/getendAuthion',async (req,res)=>{
  query = await method.Readconfig()
  pool.Select(query.DBCONFIG.GetStartauthion,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(JSON.stringify(result))
      res.json({"Authion":JSON.stringify(result)})
    }
  })
})
router.post('/valuation',async (req,res)=>{
  query = await method.Readconfig()
  pool.Select(query.DBCONFIG.GetValuation,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(JSON.stringify(result))
      res.json({"Authion":JSON.stringify(result)})
    }
  })
})
router.post("/getAuthion",async(req,res)=>{
  console.log(req.body)
  query = await method.Readconfig()
  
  pool.Query(query.DBCONFIG.GetAuthion,[req.body.HASH],(err,result)=>{
    if (err){
      console.log(err)
    }else{
      res.json({"Authion":JSON.stringify(result)})
    }
  })
})

router.post('/val',async(req,res)=>{
  console.log(req.body)
  query = await method.Readconfig()
  pool.Query(query.DBCONFIG.SetValue,[req.body.HASH],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      valuation =mid.valuation(req.body.acc,req.body.HASH,req.body.value);
      valuation.then(console.log)
      res.json(true)
    }
  })
})
module.exports = router
