var token = '0x345547c5707378d4B5d922015c469f85562D8f80'
var safeMath = '0x92d08272B26B2a93fD7d9037FC6a8d651dE974de'
var authion = '0x8FF0f5614e3067a09F58310f01EcafA08468E4a7'

var Web3 = require('web3')
var fs = require('fs')
var authionData = fs.readFileSync('C:\\Users\\LINX\\Desktop\\Dapp\\BlockchainDemo\\BlockChainDemo\\Web3js\\ABI\\authion.json', 'utf-8')
var tokenDate = fs.readFileSync('C:\\Users\\LINX\\Desktop\\Dapp\\BlockchainDemo\\BlockChainDemo\\Web3js\\ABI\\Token.json', 'utf-8')
//连接到Ganache
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
var authionContract = new web3.eth.Contract(JSON.parse(authionData), authion)
var tokenContract = new web3.eth.Contract(JSON.parse(tokenDate), token)
async function Getaccout() {
  return (await web3.eth.getAccounts())[0]
}
async function call() {
  console.log(await Getaccout())
}
async function MyAuctions(callAdd) {
  const str = await authionContract.methods.MyAuctions().call({
    from: callAdd,
  })
  return str
}

async function ObjBit(callAdd, Hash, value) {
  const promise = await authionContract.methods.ObjBit(Hash, value).send({
    from: callAdd,
  })
  return promise
}

async function StartAution(callAdd, Hash) {
  const promise = await authionContract.methods.StartAution(Hash).send({
    from: callAdd,
  })
  return promise
}

async function EndingAuthion(callAdd, Hash) {
  const promise = await authionContract.methods.EndingAuthion(Hash).send({
    from: callAdd,
  })
  return promise
}

async function valuation(callAdd, Hash, value) {
  const promise = await authionContract.methods.valuation(Hash, value).send({
    from: callAdd,
  })
  return promise
}
async function lookValue(callAdd, Hash) {
  const promise = await authionContract.methods.lookValue(Hash).call({
    from: callAdd,
  })
  return promise
}

async function ChangeValue(callAdd, Hash, value) {
  const promise = await authionContract.methods.changeValue().send({
    from: callAdd,
  })
  return promise
}

async function OwenrChange(callAdd, Hash) {
  const promise = await authionContract.methods.OwenrChange().send({
    from: callAdd,
  })
}
async function SetAdmin(callAdd, Admin_addr, Admin_name) {
  const promise = await authionContract.methods
    .SetAdmin(Admin_addr, Admin_name)
    .send({
      from: callAdd,
    })
  return promise
}

async function SetExpre(callAdd, Expert_addr, Expert_name) {
  const promise = await authionContract.methods
    .SetExpre(Expert_addr, Expert_name)
    .send({
      from: callAdd,
    })
  return promise
}

async function SetOwner(callAdd, OwnerName, Owner_addr) {
  const promise = authionContract.methods.SetOwner(OwnerName, Owner_addr).send({
    from: callAdd,
  })
  return promise
}

async function SetAution(callAdd, Hash, value) {
  const promise = authionContract.methods.SetAution(Hash, value).send({
    from: callAdd,
  })
  return promise
}

async function Get_Contract_Balance() {
  const account = await Getaccout()
  const promise = authionContract.methods.Get_Contract_Balance().call({
    from: account,
  })
}

async function Pay_value(callAdd, Hash) {
  const promise = authionContract.methods.Pay_value(Hash).send({
    from: callAdd,
  })
  return promise
}

async function withdraw(callAdd, Hash) {
  const promise = authionContract.methods.withdraw(Hash).send({
    from: callAdd,
  })
  return promise
}

async function GetTokenBalance(callAdd){
  const promise = tokenContract.methods.balanceOf(callAdd).call({
    from:callAdd
  })
  return promise
}

// var ObjBit = authionContract.methods.ObjBit().call();
//     console.log(ObjBit)
// var StartAution = authionContract.methods.StartAution();
// var EndingAuthion = authionContract.methods.EndingAuthion();
// var valuation = authionContract.methods.valuation();
// var lookValue = authionContract.methods.lookValue();
// var ChangeValue = authionContract.methods.changeValue();
// var OwenrChange = authionContract.methods.OwenrChange();
// var SetAdmin = authionContract.methods.SetAdmin();
// var SetExpre = authionContract.methods.SetExpre();
// var SetOwner = authionContract.methods.SetOwner();
// var SetAution = authionContract.methods.SetAution();
// var Get_Contract_Balance = authionContract.methods.Get_Contract_Balance();
// var Pay_value = authionContract.methods.Pay_value();
// var withdraw = authionContract.methods.withdraw();
// var OBJ_linhao = authionContract.methods.OBJ_linhao();

// console.log(OBJ_linhao);

module.exports = {
  Getaccout,
  MyAuctions,
  ObjBit,
  StartAution,
  EndingAuthion,
  valuation,
  lookValue,
  ChangeValue,
  OwenrChange,
  SetAdmin,
  SetExpre,
  SetOwner,
  SetAution,
  Get_Contract_Balance,
  Pay_value,
  withdraw,
  GetTokenBalance
}
