var express = require('express')
var pool = require('../config/dbConfig')
var middle = require('../Web3js/middle')
var router = express.Router()
var method = require('../config/methodConfig')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.post('/', async (req, res) => {
  acc = req.body.acc;
  console.log(req.body)
  insert = await method.Readconfig();
  token = await middle.GetTokenBalance(acc);
  pool.Query(insert.DBCONFIG[0].QueryRep, [acc], (err, result) => {
    if (err) {
      console.log(err)
    } else if (result.length > 0) {
      console.log('sucess!')
      res.json({token:token})
    } else {
      pool.Query(insert.DBCONFIG[0].REGISTER, [acc], (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      })
    }
  })
})

router.post('/token',(req,res)=>{

})

module.exports = router
