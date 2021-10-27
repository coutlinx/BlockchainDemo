var express = require("express");
var pool = require("../config/dbConfig");
var method = require("../config/methodConfig");
var fs = require("fs");

var router = express.Router();
router.get("/", function (req, res, next) {
  res.render("register");
});
router.post("/", (req, res) => {
  let users = method.User(req.body.name, req.body.phone, req.body.password);
  let insert = Readconfig();
  console.log(insert.login_register[0].insert);
  console.log(users);
  pool.getConnection((err, connect) => {
    if (err) {
      console.log(err);
    } else {
      connect.query("show databases", (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      });
    }
    connect.release();
  });
});

//读取config文件函数
function Readconfig() {
    let query;
     query = fs.readFileSync("./config/db.json", "utf-8")
     query = JSON.parse(query);
    return query
  }

module.exports = router;
