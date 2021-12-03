var crypto = require("crypto");
var fs = require("fs");
var mid = require("../Web3js/middle")
var sha256 = require('sha256')
//加密用的key和向量
const password = "FnJL7EDzjqWjcaY9";
const iv = "FnJL7EDzjqWjcaY9";


//创建用户函数
function User(name, phone, passwd) {
  let user = {
    name: name,
    phone: phone,
    passwd: passwd,
  };
  return user;
}

//加密密码
function Encrypt(passwd) {
  let cipher  = crypto.createCipheriv("aes-128-cbc",password,iv);
   cipher.update(passwd, "utf8","hex");
  return cipher.final("hex");
}

//解密密码
function Decode(_passwd) {
  let decipher = crypto.createDecipheriv("aes-128-cbc",password,iv);
   decipher.update(_passwd, "hex","utf8");
  return decipher.final().toString()
}

function TurnintoHash(Hash){
  return "0x"+sha256(Hash)
}

async function Readconfig() {
  let query;
  query =fs.readFileSync("./config/db.json", "utf-8");
  query = JSON.parse(query);
  return query;
}
async function GetTokenBalance(address){
  return mid.GetTokenBalance(address)
}
module.exports = {
  User,
  Encrypt,
  Decode,
  TurnintoHash,
  Readconfig,
  GetTokenBalance
};
