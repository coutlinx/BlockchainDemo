var crypto = require("crypto");

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
   cipher .update(passwd, "utf8","hex");
  return cipher.final("hex");
}

//解密密码
function Decode(_passwd) {
  let decipher = crypto.createDecipheriv("aes-128-cbc",password,iv);
   decipher.update(_passwd, "hex","utf8");
  return decipher.final().toString()
}

module.exports = {
  User,
  Encrypt,
  Decode,
};
