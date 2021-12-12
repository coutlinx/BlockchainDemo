var express = require('express')
var pool = require('../config/dbConfig')
var method = require('../config/methodConfig')
var middle = require('../Web3js/middle')
var router = express.Router()
var address
router.get('/', async function (req, res) {
  var money, authion
  // console.log(address)
  var query = await method.Readconfig()
  pool.Query(
    'select * from addauthion where user = (select ID from user where address = ?)',
    [address],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result[0] == undefined) {
          res.render('myself', { Authion: '' })
        } else {
          money = result[0].money
          authion = result[0].authion
          pool.Query(
            query.DBCONFIG.GetAuthionById,
            [authion],
            (err, result) => {
              if (err) {
                console.error(err)
              } else {
                // console.log(result)
                res.render('myself', { Authion: JSON.stringify(result[0]) })
              }
            },
          )
        }
      }
    },
  )
})
router.post('/setaddr', (req, res) => {
  // console.log(req.body)
  address = req.body.ACC
})
router.post('/more', (req, res) => {
  // console.log(req.body)
  pool.Query(
    'select status from authion where Hash = ?',
    [req.body.HASH],
    async (err, result) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(result)
        if (result[0].status == 0) {
          higestbider = await middle.GetHibestBider(req.body.HASH)
          if (higestbider.toUpperCase() == req.body.ACC.toUpperCase()) {
            value = await middle.GetHibest_bid_linhao(req.body.HASH)
            res.json({ Status: 0, Value: value, Hash: req.body.HASH })
          } else {
            res.json({
              Status: 1,
              Reason: 'The authion is ending',
              Hash: req.body.HASH,
            })
          }
        } else {
          res.json({ Status: -1, Hash: req.body.HASH })
        }
      }
    },
  )
})
router.post('/payVal', (req, res) => {
  acc = req.body.ACC.split('')
  for (i = 2; i < acc.length; i++) {
    acc[i] = acc[i].toUpperCase()
  }
  acc = acc.join('')
  // console.log(acc,req.body.HASH)
  console.log(`${req.body.HASH}`)
  method.Write(req.body.HASH)
  // method.Read().then((res) => {
  //   middle
  //     .GetHibestBider(res)
  //     .then(console.log)
  //     .then(
  //       middle.Pay_value(req.body.ACC, req.body.HASH).then((result) => {
  //         res.json(result);
  //       }),
  //     )
  // })
})
module.exports = router
