var Account, Token
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!')
  getAccount().then((res) => {
    Account = res[0]
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/recharge/token',
      data: { acc: Account },
      dataType: 'json',
      success: function (data) {
        Token = parseInt(data.token / Math.pow(10, 18)) + 'LINX'
        console.log(Token)
        $('#balance span').html(Token)
      },
      error: function (data) {
        console.log(data)
      },
    })
  })
} else {
  alert('Plase install MetaMask')
}

function getAccount() {
  return ethereum.request({ method: 'eth_requestAccounts' })
}

function recharge(e) {
  value = $(e).children()[1].innerHTML
  value = value.split('YUAN')[0]
  acc = getAccount().then((res) => {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/recharge/values',
      data: { acc: res[0], Balance: value },
      dataType: 'json',
      success: function (data) {
        console.log(data)
        returns = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">充值完成</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item" style="text-overflow:ellipsis;overflow: hidden;">blockHash:${data.statu.blockHash}</li>
                        <li class="list-group-item list-group-item-primary" style="text-overflow:ellipsis;overflow: hidden;">blockNumber:${data.statu.blockNumber}</li>
                        <li class="list-group-item list-group-item-secondary" style="text-overflow:ellipsis;overflow: hidden;">contractAddress:${data.statu.contractAddress}</li>
                        <li class="list-group-item list-group-item-success" style="text-overflow:ellipsis;overflow: hidden;">cumulativeGasUsed:${data.statu.cumulativeGasUsed}</li>
                        <li class="list-group-item list-group-item-danger" style="text-overflow:ellipsis;overflow: hidden;">from:${data.statu.from}</li>
                        <li class="list-group-item list-group-item-warning" style="text-overflow:ellipsis;overflow: hidden;">gasUsed:${data.statu.gasUsed}</li>
                        <li class="list-group-item list-group-item-info" style="text-overflow:ellipsis;overflow: hidden;">to:${data.statu.to}</li>
                        <li class="list-group-item list-group-item-light" style="text-overflow:ellipsis;overflow: hidden;">transactionHash:${data.statu.transactionHash}</li>
                        <li class="list-group-item list-group-item-dark" style="text-overflow:ellipsis;overflow: hidden;">logsBloom:${data.statu.logsBloom}</li>
                      </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>`
        $('#res').html(returns)
        $(function () {
          $('#exampleModalLong').modal('show')
        })
      },
      error: function (data) {
        console.log(data)
      },
    })
  })
}

ethereum.on('accountsChanged', function (accounts) {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/recharge/token',
    data: { acc: accounts[0] },
    dataType: 'json',
    success: function (data) {
      Token = parseInt(data.token / Math.pow(10, 18)) + 'LINX'
      console.log(Token)
      $('#balance span').html(Token)
    },
    error: function (data) {
      console.log(data)
    },
  })
})
