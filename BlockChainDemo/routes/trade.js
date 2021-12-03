var express = require('express')
var router = express.Router()
var mid = require('../Web3js/middle')
var method = require('../config/methodConfig')
var pool = require('../config/dbConfig')
var Account
router.get('/', function (req, res, next) {
  res.render('trade')
})
router.post('/', async (req, res) => {
  TradeJson = {
    name: req.body.name,
    about: req.body.more,
  }
  authionQuery = await method.Readconfig()
  GetID = authionQuery.DBCONFIG.Getid
  authionQuery = authionQuery.DBCONFIG.SetAuthion
  Hash = JSON.stringify(TradeJson)
  Hash = method.TurnintoHash(Hash)
  console.log(Account)
  pool.Query(GetID, [Account], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      pool.Query(
        authionQuery,
        [req.body.name, req.body.more, Hash, result[0].ID],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result)
            mid.SetAution(Account,Hash,req.body.value).then(console.log)
            res.redirect("./")
          }
        },
      )
    }
  })
})
router.post('/setacc', (req, res) => {
  Account = req.body.acc
  console.log(Account)
})
module.exports = router
