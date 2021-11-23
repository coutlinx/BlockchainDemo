var token = '0x345547c5707378d4B5d922015c469f85562D8f80'
var safeMath = '0x92d08272B26B2a93fD7d9037FC6a8d651dE974de'
var authion = '0x8FF0f5614e3067a09F58310f01EcafA08468E4a7'

var Web3 = require("web3");
var fs = require('fs');
var authionData =fs.readFileSync("./ABI/authion.json","utf-8");  
var tokenDate = fs.readFileSync("./ABI/Token.json","utf-8");
//连接到Ganache 
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
var authionContract = new web3.eth.Contract(JSON.parse(authionData),authion)
var tokenContract = new web3.eth.Contract(JSON.parse(tokenDate),token);
async function Getaccount(){
    return (await web3.eth.getAccounts())[0]
}
async function call(){
    console.log(await(MyAuctions()))
}
async function MyAuctions(){
    const account = await Getaccount();
    const str = await authionContract.methods.MyAuctions().call({
        from:account,
    });
    return str;
}
call()

async function ObjBit(Hash,value){
    const account = await Getaccount();
    const promise = await authionContract.methods.ObjBit(Hash,value).send({
        from:account
    }); 
    return promise;
}

async function StartAution(Hash){
    const account = await Getaccount();
    const promise = await authionContract.methods.StartAution(Hash).send({
        from:account
    })
    return promise
}

async function EndingAuthion(Hash){
    const account = await Getaccount();
    const promise = await authionContract.methods.EndingAuthion(Hash).send({
        from:account
    });
    return promise  
}

async function valuation(Hash,value){
    const account = await Getaccount();
    const promise = await authionContract.methods.valuation(Hash,value).send({
        from:account
    });
    return promise;
}

async function lookValue(Hash){
    const account = await Getaccount();
    const promise = await authionContract.methods.lookValue(Hash).call();
    return promise;
}

async function 
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




