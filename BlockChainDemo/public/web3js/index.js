var accounts = [];
var balance;
if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
  getAccount((err, acc) => {
    if (err) {
      console.log(err);
    }else{
        console.log(acc)
        accounts =acc;
    }
  });
      getBalance((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });

} else {
  alter("plase install the MetaMask");
}

function getAccount(callback) {
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => callback(null, res))
    .catch((err) => callback(err, null));

  //   accNum = accounts.length;
  //   const account = accounts[0];
  //   $("#accountAddress").html(account);
  //   for (let i = 0; i < accNum; i++) {
  //     $option = `<option>${accounts[i]}</option>`;
  //     $("#bidAccount").append($option);
  //     console.log(accounts[i]);
  //   }
}
function getBalance(callback) {
  ethereum
    .request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    })
    .then((res) => {
      callback(null, res);
    })
    .catch((error) => {
      callback(error, null);
    });
}
