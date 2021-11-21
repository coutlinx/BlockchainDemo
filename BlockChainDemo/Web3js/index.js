var token = '0x61c88058037BCCbC8356Dc11329E266533f394c4'
var safeMath = '0xF54b5D84a42a6C2A8639985c12acd0affA9278A1'
var authion = '0x526f6221433A59c3550bdd033D9600132f478C86'
var Hello = '0x032E3adE6D3Cbdd76c58fD7FD5506b013B87b494'
var Web3 = require("web3");
var fs = require('fs');

var authionData =fs.readFileSync("./ABI/authion.json","utf-8");  
//连接到Ganache
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
var myContract = new web3.eth.Contract(JSON.parse(authionData),authion)

myContract.methods.MyAuctions().call().then(console.log)
