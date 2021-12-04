var express = require('express')
var pool = require('../config/dbConfig')
var middle = require('../Web3js/middle')
var router = express.Router()
var method = require('../config/methodConfig')
var acc
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
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

router.post('/setOwner?', (req, res) => {
  console.log(req.body)
  middle.SetOwner(req.body.name,acc).then(console.log)
})

module.exports = router
