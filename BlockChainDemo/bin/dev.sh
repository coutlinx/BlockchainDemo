npm run prestart #先编译
node $1 ./BlockChainDemo/app.js #因为nodemon启动时默认带了--inspect-brk参数，此时获取该参数并启动可以实现pid的Attachs