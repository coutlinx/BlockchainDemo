
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
      $.ajax({  
        type: 'POST',
        url: 'http://localhost:3000/',
        data: { acc: Account},
        dataType: 'json',
        success: function (data) {
          if(data.alert == "name"){
            console.log(1)
            $('#exampleModal').modal('show')
          }
          $('#accountBalance').html(parseInt(data.token / Math.pow(10, 18)) + 'LINX')
          
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

ethereum.on('accountsChanged', function (accounts) {
  $.ajax({  
    type: 'POST',
    url: 'http://localhost:3000/',
    data: { acc: accounts[0]},
    dataType: 'json',
    success: function (data) {
      $('#accountAddress').html(accounts[0])
      $option = `<option>${accounts[0]}</option>`
      $('#bidAccount').append($option)
      $('#accountBalance').html(parseInt(data.token / Math.pow(10, 18)) + 'LINX')
    },
    error: function (data) {
      console.log(data)
    },
  })
})