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

//读取config文件

module.exports = router
// "<!-- extends layout

// block content
//   h1= message
//   h2= error.status
//   pre #{error.stack} -->
// <p>Cannot read properties of undefined (reading &#39;0&#39;)</p>
// <p></p>
// <p>TypeError: Cannot read properties of undefined (reading &#39;0&#39;)
//     at C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\routes\index.js:15:29
//     at Layer.handle [as handle_request] (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\layer.js:95:5)
//     at next (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\route.js:137:13)
//     at Route.dispatch (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\route.js:112:3)
//     at Layer.handle [as handle_request] (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\layer.js:95:5)
//     at C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:281:22
//     at Function.process_params (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:335:12)
//     at next (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:275:10)
//     at Function.handle (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:174:3)
//     at router (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:47:12)
//     at Layer.handle [as handle_request] (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\layer.js:95:5)
//     at trim_prefix (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:317:13)
//     at C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:284:7
//     at Function.process_params (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:335:12)
//     at next (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express\lib\router\index.js:275:10)
//     at Immediate.&lt;anonymous&gt; (C:\Users\LINX\Desktop\Dapp\BlockchainDemo\BlockChainDemo\node_modules\express-session\index.js:506:7)</p>"