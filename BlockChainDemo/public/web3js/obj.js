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
    },
    error:function(data){
      console.log(data)
    }
  })
}
