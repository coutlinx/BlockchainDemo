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
  users.passwd = method.Encrypt(users.passwd);
  //对网页传进来的数据处理

  let register = Readconfig();
  let registerQuery = register.DBCONFIG[0].REGISTER;
  //调用json文件来使用sql语句

  pool.getConnection((err, connect) => {
    if (err) {
      console.log(err);
    } else {
      connect.query(
        registerQuery,
        [users.name, users.passwd, users.phone],
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log(results);
          }
        }
      );
    }
    connect.release();
  });
  req.session.user = users;
  res.redirect("../");
});

//读取config文件
function Readconfig() {
  let query;
  query = fs.readFileSync("./config/db.json", "utf-8");
  query = JSON.parse(query);
  return query;
}

module.exports = router;
