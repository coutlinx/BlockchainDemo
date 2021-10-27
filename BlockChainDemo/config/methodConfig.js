//读取config文件函数
var fs = require("fs");
function Readconfig() {
  fs.readFile("./config/db.json", "utf-8", (err, data) => {
    let query;
    if (err) {
      throw err;
    }
    query = JSON.parse(data);
    return query;
  });
}
var query = Readconfig();
//创建用户函数
function User(name, phone, passwd) {
  let user = {
      name:name,
      phone:phone,
      passwd:passwd
  }
  return user
}

module.exports = {
  query,
  User,
};
