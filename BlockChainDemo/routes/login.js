var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("login");
});
router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
