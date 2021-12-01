
var Balance, Account
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!')
  getAccount()
    .then((res) => getBalance(res[0]))
    .then((res) => {
      Balance = res
      $('#accountAddress').html(Account)
      $option = `<option>${Account}</option>`
      $('#bidAccount').append($option)
      $('#accountBalance').html(parseInt(Balance / Math.pow(10, 18)) + 'LINX')
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/',
        data: { acc: Account, Balance: Balance },
        dataType: 'json',
        sucess: function (data) {
          console.log(data)
        },
        error: function (data) {
          console.log(data)
        },
      })
    })
} else {
  alert('plase install the MetaMask')
}
function getAccount() {
  return ethereum.request({ method: 'eth_requestAccounts' })
}

function getBalance(acc) {
  Account = acc
  return ethereum.request({ method: 'eth_getBalance', params: [acc, 'latest'] })
}
