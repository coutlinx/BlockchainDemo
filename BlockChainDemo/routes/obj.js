var express = require('express')
var router = express.Router()
var mid = require('../Web3js/middle')
var pool = require('../config/dbConfig')
var method = require('../config/methodConfig')
var acc
router.get('/', async function (req, res, next) {
  if(acc == undefined){
    res.render('object',{"Arr":[]})
  }else{
  try {
    var Hash = await mid.MyAuctions(acc)
  } catch (e) {
    console.log(e)
    
  }
  console.log("Hash ===>",Hash,acc)
  var arr =[];
  var Arr;
  const query = await method.Readconfig()
  for (let i = 0; i < Hash.length; i++) {
    if (Hash[i] != ""){
      pool.Query(query.DBCONFIG.GetAuthion, [Hash[i]], (err, result) => {
       if (err) {
         console.error(err)
       } else {
         console.log(result)
         Arr = {
           "id":result[0].id,
           "name":result[0].name,
           "about":result[0].about,
           "status":result[0].status,
           "Hash":result[0].Hash,
           "authion_user":result[0].authion_user
         }
         arr.push(JSON.stringify(Arr))
       }
     })
    }
  }
  setTimeout(()=>{
    console.log((arr))
    res.render('object',{"Arr":arr})
  },1000)
}
})

router.post('/setacc', (req, res) => {
  acc = req.body.acc
  console.log(acc)
})

router.post('/more',async (req,res)=>{
  console.log(req.body)
  value = await mid.lookValue(req.body.ACC,req.body.HASH);
  console.log(value)
  res.json({Value:value,Hash:req.body.HASH})
})

router.post('/confirm',async(req,res)=>{
  console.log(req.body)
  confirm = await mid.ChangeValue(req.body.ACC,"0xa1b81916b220986d104612ba33a1d92d86fcdfe557b4231362b45af8a8b52a0b",req.body.VALUE)
  console.log(confirm)
  res.json({statu:confirm})
})
module.exports = router
