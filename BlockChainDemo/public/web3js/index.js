if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
  var p1 = new Promise(getAccount);
  p1.then((acc) => {
    accounts = acc;
    accNum = acc.length;
    $("#accountAddress").html(acc[0]);
    for (let i = 0; i < accNum; i++) {
      $option = `<option>${acc[i]}</option>`;
      $("#bidAccount").append($option);
      console.log(acc[i]);
    }
    getBalance((err, res) => {
      if (err) {
        console.log(err);
      } else {
        $("#accountBalance").html(parseInt(res / Math.pow(10, 18)) + "ETH");
        console.log(res);
        $.ajax({
          URL: "./",
          type: "POST",
          data: { acc: acc[0], Balance: res },
          dataType:"json"
        });
      }
    });
  }).catch((err) => console.log(err));
} else {
  alter("plase install the MetaMask");
}

function getAccount(resolve, reject) {
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => resolve(res))
    .catch((err) => reject(err));

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
