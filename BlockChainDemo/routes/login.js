var express = require("express");
var pool = require("../config/dbConfig");
var method = require("../config/methodConfig");
var fs = require("fs");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("login");
});
router.post("/", (req, res) => {
  let user = method.User(req.body.name, "", req.body.password, "");
  let passwd = method.Encrypt(user.passwd);
  //对网页传进来的数据处理

  let login = Readconfig();
  let LoginQuery = login.DBCONFIG[0].LOGIN;
  //调用json文件来使用sql语句

  pool.Query(LoginQuery, [user.name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let Cpasswd = result[0].passwd;
      if(Cpasswd == passwd){
        req.session.user = user;
        res.redirect("../")
      }else{
        res.redirect(null);
      }
    }
  });
});

//读取config文件
function Readconfig() {
  let query;
  query = fs.readFileSync("./config/db.json", "utf-8");
  query = JSON.parse(query);
  return query;
}

module.exports = router;
