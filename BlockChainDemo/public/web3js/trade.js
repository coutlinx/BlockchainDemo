var Account
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!')
  getAccount().then((res) => {
    Account = res[0]
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/trade/setacc',
      data: { acc: Account },
      dataType: 'json',
      success: function (data) {
        console.log(data)
      },
      error: function (data) {
        console.log(data)
      },
    })
    Hash = $("#Hash").val()
    Hash = Hash.split(',')
    console.log(Hash[0])
    var authion = ""
  for (let i = 0; i < Hash.length; i++) {
    authion = `<div class="mainOBJ" onclick = "Authion(this)">
    <img
    src="https://www.chanel.com/wfj/medias/PUSH-HP-JOAILLERIE-MOB-1534x1774-copie3-1-.jpg?context=bWFzdGVyfGNtc2ltYWdlc3w2NTk1MDF8aW1hZ2UvanBlZ3xjbXNpbWFnZXMvaDhlL2hhMi84OTQzMTE2MTg5NzI2LmpwZ3xlODZkMmQ4MGMzZjI3MWYyNDAxOWExOTQ2NGI4OTM3M2VjYjE1MDQ5YjU4MDBjM2I3ZTQ3YmFjNTMxOWQ2YTJh">
    <span style=" overflow: hidden;
    text-overflow: ellipsis;">HASH:${Hash[i]}</span>
  </div>`
  $('.main_content').append(authion)
  }
  })
} else {
  alert('Plase install MetaMask')
}
`<div class="mainOBJ" >
<img
    src="https://www.chanel.com/wfj/medias/PUSH-HP-JOAILLERIE-MOB-1534x1774-copie3-1-.jpg?context=bWFzdGVyfGNtc2ltYWdlc3w2NTk1MDF8aW1hZ2UvanBlZ3xjbXNpbWFnZXMvaDhlL2hhMi84OTQzMTE2MTg5NzI2LmpwZ3xlODZkMmQ4MGMzZjI3MWYyNDAxOWExOTQ2NGI4OTM3M2VjYjE1MDQ5YjU4MDBjM2I3ZTQ3YmFjNTMxOWQ2YTJh">
<span>HASH:</span>
</div>`


function getAccount() {
    return ethereum.request({ method: 'eth_requestAccounts' })
  }

  function Authion(e){
    Hash = value = $(e).children()[1].innerHTML.split('HASH:')[1]
    location.href = `http://localhost:3000/authion/${Hash}`
  }