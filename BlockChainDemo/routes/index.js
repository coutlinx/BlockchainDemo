var express = require('express')
var pool = require('../config/dbConfig')
var web3 = require('../Web3js/middle')
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
  pool.Query(insert.DBCONFIG[0].QueryRep, [acc], (err, res) => {
    if (err) {
      console.log(err)
    } else if (res.length > 0) {
      console.log('sucess!')
    } else {
      pool.Query(insert.DBCONFIG[0].REGISTER, [acc], (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
      })
    }
  })
})

module.exports = router
