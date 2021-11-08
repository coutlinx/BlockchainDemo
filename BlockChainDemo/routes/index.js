var express = require('express');
var pool = require("../config/dbConfig");
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',(req,res)=>{
  self = {
    acc:req.body.acc,
    balance:req.body.Balance
  }
  req.session.self = self;
  insert = Readconfig();
pool.Query(insert.DBCONFIG[0].QueryRep,[self.acc],(err,res)=>{
  if(err){
    console.log(err);
  }else if(res.length>0){
    console.log("sucess!");
  }else{
      pool.Query(insert.DBCONFIG[0].REGISTER,[self.acc],(err,res)=>{
        if(err){ 
          console.log(err)
        }else{
          console.log(res);
        }
      })
  }
})
})

//读取config文件
function Readconfig() {
  let query;
  query = fs.readFileSync("./config/db.json", "utf-8");
  query = JSON.parse(query);
  return query;
}
module.exports = router;
