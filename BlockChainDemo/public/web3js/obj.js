var Account
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!')
  getAccount().then((res) => {
    Account = res[0]
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/obj/setacc',
      data: { acc: Account },
      dataType: 'json',
      success: function (data) {
        console.log(data)
      },
      error: function (data) {
        console.log(data)
      },
    })
  })
  Hash = $.parseJSON('[' + $('#Hash').val() + ']')
  console.log(Hash)
  var authion = ''
  for (let i = 0; i < Hash.length; i++) {
    authion += `<div class="mainOBJ" onclick = "more(this)">
    <img
        src="https://rukminim1.flixcart.com/image/714/857/kb2jmvk0/necklace-chain/v/r/a/simple-chain-chain-vien-original-imafsg7w4a5a6hhm.jpeg?q=50">
    <span style=" overflow: hidden;
    text-overflow: ellipsis;">HASH:${Hash[i].Hash}</span>
  </div>`
    $('.main_content').html(authion)
  }
  authion = ''
} else {
  alert('Plase install MetaMask')
}

function getAccount() {
  return ethereum.request({ method: 'eth_requestAccounts' })
}

async function more(e) {
  acc = await getAccount()
  Hash = e.children[1].innerHTML.split('HASH:')[1]
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/obj/more',
    data: { HASH: Hash,ACC:acc[0] },
    dataType: 'json',
    success:function(data){
      console.log(data)
      $(".modal-body").html(`<ul class="list-group">
      <li class="list-group-item">预估价格:${data.Value}</li>
      <li class="list-group-item list-group-item-primary" id="HASH">物品Hash:${data.Hash} </li>
      <input class="form-control" type="text" id="val" placeholder="请输入您的价格">
    </ul>`)
      $("#addcase").modal("show")
    },
    error:function(data){
      console.log(data)
    }
  })
}

async function confirm(){
  value = $("#val").val()
  acc = await getAccount()
  hash = $("#HASH").html().split("物品Hash:")[1]
  console.log(hash)
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/obj/confirm',
    data: { VALUE: value,ACC:acc[0],HASH:hash},
    dataType: 'json',
    success:function(data){
      $(".modal-body").html(`<ul class="list-group">
      <li class="list-group-item" style="text-overflow:ellipsis;overflow: hidden;">blockHash:${data.statu.blockHash}</li>
      <li class="list-group-item list-group-item-primary" style="text-overflow:ellipsis;overflow: hidden;">blockNumber:${data.statu.blockNumber}</li>
      <li class="list-group-item list-group-item-secondary" style="text-overflow:ellipsis;overflow: hidden;">contractAddress:${data.statu.contractAddress}</li>
      <li class="list-group-item list-group-item-success" style="text-overflow:ellipsis;overflow: hidden;">cumulativeGasUsed:${data.statu.cumulativeGasUsed}</li>
      <li class="list-group-item list-group-item-danger" style="text-overflow:ellipsis;overflow: hidden;">from:${data.statu.from}</li>
      <li class="list-group-item list-group-item-warning" style="text-overflow:ellipsis;overflow: hidden;">gasUsed:${data.statu.gasUsed}</li>
      <li class="list-group-item list-group-item-info" style="text-overflow:ellipsis;overflow: hidden;">to:${data.statu.to}</li>
      <li class="list-group-item list-group-item-light" style="text-overflow:ellipsis;overflow: hidden;">transactionHash:${data.statu.transactionHash}</li>
      <li class="list-group-item list-group-item-dark" style="text-overflow:ellipsis;overflow: hidden;">logsBloom:${data.statu.logsBloom}</li>
    </ul>`)
    },
    error:function(data){

    }
  })
}
