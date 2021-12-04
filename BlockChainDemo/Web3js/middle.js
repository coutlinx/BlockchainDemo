var token = '0x345547c5707378d4B5d922015c469f85562D8f80'
var safeMath = '0x92d08272B26B2a93fD7d9037FC6a8d651dE974de'
var authion = '0xdCB0dD0462EE5685175f42Fb010bcE7A056A5da0'

var Web3 = require('web3')
var fs = require('fs')
var authionData = fs.readFileSync(
  'C:\\Users\\LINX\\Desktop\\Dapp\\BlockchainDemo\\BlockChainDemo\\Web3js\\ABI\\authion.json',
  'utf-8',
)
var tokenDate = fs.readFileSync(
  'C:\\Users\\LINX\\Desktop\\Dapp\\BlockchainDemo\\BlockChainDemo\\Web3js\\ABI\\Token.json',
  'utf-8',
)
//连接到Ganachea
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
var authionContract = new web3.eth.Contract(JSON.parse(authionData), authion)
var tokenContract = new web3.eth.Contract(JSON.parse(tokenDate), token)
async function Getaccout() {
  return web3.eth.getAccounts()
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
      gas: '300000000',
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

async function SetOwner(OwnerName, Owner_addr) {
  const callAdd = await Getaccout()
  const promise = authionContract.methods.SetOwner(OwnerName, Owner_addr).send({
    from: callAdd[0],
    gas: '3000000',
  })
  return promise
}

async function SetAution(callAdd, Hash, value) {
  console.log(callAdd, Hash, value)
  const promise = authionContract.methods.SetAution(Hash, value).send({
    from: callAdd,
    gas: '3000000',
  })
  return promise
}
// SetAution("0x126E173fFBe22610c5B189B43c24AB60d3b88156","0xd9e8796abfde3336e62fc24e0b4d850e3fb59e7600336453a31fdb1e9fc84164",200000).then(console.log)
async function Get_Contract_Balance() {
  const account = await Getaccout()
  const promise = authionContract.methods.Get_Contract_Balance().call({
    from: account[0],
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

async function GetTokenBalance(callAdd) {
  const promise = tokenContract.methods.balanceOf(callAdd).call({
    from: callAdd,
  })
  return promise
}

async function GetOwner(callAdd) {
  const acc = Getaccout()
  const promise = authionContract.methods.GetOwner(callAdd).call({
    from: acc[0],
  })
  return promise
}

async function GetAdmin(callAdd) {
  const acc = Getaccout()
  const promise = authionContract.methods.GetAdmin(callAdd).call({
    from: acc[0],
  })
  return promise
}

async function GetExpert(callAdd) {
  const acc = Getaccout()
  const promise = authionContract.methods.GetExpert(callAdd).call({
    from: acc[0],
  })
  return promise
}

async function RechargeToken(callAdd, value) {
  const account = await web3.eth.getAccounts()
  const promise = tokenContract.methods
    .transfer(callAdd, BigInt(value * 10 ** 18))
    .send({
      from: account[0],
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
  GetTokenBalance,
  RechargeToken,
  GetOwner,
  GetAdmin,
  GetExpert,
}
