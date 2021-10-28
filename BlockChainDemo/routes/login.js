var express = require("express");
var method = require("../config/methodConfig");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("login");
});
router.post("/", (req, res) => {
  let user = method.User(req.body.name,"",req.body.password,"");
  console.log(method.Decode(user.passwd));
  console.log(req.body);
});

module.exports = router;
