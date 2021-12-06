var Account
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!')
  getAccount().then((res) => {
    Account = res[0]
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/more/setacc',
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
  identity = $('#value').val()
  if (identity == 'admin') {
    $('.main_content')
      .append(`<div class="btn-group btn-group-justified" role="group" aria-label="...">
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default" onclick="EndAuthion(this)">等待结束的拍卖</button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default active" onclick="startAuthion(this)">等待开始的拍卖</button>
                </div>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-default" onclick="setIdentity(this)">设置权限</button>
                </div>
            </div>
            <div class="contant" style="margin-left: 20%; width: 60%; margin-top: 10%;">
                <div class="mainOBJ" style="width:45%;">
                    <img
                        src="https://rukminim1.flixcart.com/image/714/857/kb2jmvk0/necklace-chain/v/r/a/simple-chain-chain-vien-original-imafsg7w4a5a6hhm.jpeg?q=50">
                    <span>HASH:</span>
                    <button type="button" class="btn btn-default" style="margin-left: 40%;background-color: black; color: aliceblue;">开始</button>
                    
                </div>
            </div>`)
  } else if (identity == 'user') {
    $('.main_content').append(`<div class="jumbotron">
                <h1>还在筹备中...</h1>
                <p>请等待我们的更新</p>
                <p><a class="btn btn-primary btn-lg" href="/" role="button">返回</a></p>
              </div>`)
  } else {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/more/valuation',
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var main = ''
        authion = $.parseJSON(data.Authion)
        console.log(authion)
        for (let i = 0; i < authion.length; i++) {
          main += `<div class="mainOBJ" style="width:45%;">
            <img
                src="https://rukminim1.flixcart.com/image/714/857/kb2jmvk0/necklace-chain/v/r/a/simple-chain-chain-vien-original-imafsg7w4a5a6hhm.jpeg?q=50">
            <span style=" overflow: hidden;
            text-overflow: ellipsis;">HASH:${authion[i].Hash}</span>
            <button type="button" class="btn btn-default" style="margin-left: 40%;background-color: black; color: aliceblue;">估值</button>
        </div>`
        }
        $('.main_content').append(main)
      },
      error: function (data) {
        console.log(data)
      },
    })
  }
  function startAuthion(e) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/more/getauthion',
      dataType: 'json',
      success: function (data) {
        var main = ''
        authion = $.parseJSON(data.Authion)
        console.log(authion)
        for (let i = 0; i < authion.length; i++) {
          main += `<div class="mainOBJ" style="width:45%;">
            <img
                src="https://rukminim1.flixcart.com/image/714/857/kb2jmvk0/necklace-chain/v/r/a/simple-chain-chain-vien-original-imafsg7w4a5a6hhm.jpeg?q=50">
            <span style=" overflow: hidden;
            text-overflow: ellipsis;">HASH:${authion[i].Hash}</span>
            <button type="button" class="btn btn-default" style="margin-left: 40%;background-color: black; color: aliceblue;">开始</button>
        </div>`
        }
        $('.active').removeClass('active')
        e.classList.add('active')
        $('.contant').html('')
        $('.contant').append(main)
      },
      error: function (data) {
        console.log(data)
      },
    })
  }
  function EndAuthion(e) {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/more/getendAuthion',
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var main = ''
        authion = $.parseJSON(data.Authion)
        console.log(authion)
        for (let i = 0; i < authion.length; i++) {
          main += `<div class="mainOBJ" style="width:45%;">
            <img
                src="https://rukminim1.flixcart.com/image/714/857/kb2jmvk0/necklace-chain/v/r/a/simple-chain-chain-vien-original-imafsg7w4a5a6hhm.jpeg?q=50">
            <span style=" overflow: hidden;
            text-overflow: ellipsis;">HASH:${authion[i].Hash}</span>
            <button type="button" class="btn btn-default" style="margin-left: 40%;background-color: black; color: aliceblue;">结束</button>
        </div>`
        }
        $('.active').removeClass('active')
        e.classList.add('active')
        $('.contant').html('')
        $('.contant').append(main)
      },
      error: function (data) {
        console.log(data)
      },
    })
    console.log(2)
  }
  function setIdentity(e) {
    console.log(3)
    $('.active').removeClass('active')
    e.classList.add('active')
    $('.contant').html('')
    $('.contant')
      .append(`<form class="form-horizontal" action="http://localhost:3000/more/setIdentity" method="post">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">您的地址</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputEmail3" name="YourAddress"placeholder="YourAddress">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">地址</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputEmail3" name="Address"placeholder="Address">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword3" class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputPassword3"name="Name" placeholder="Name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">身份</label>
                        <div class="col-sm-3">
                            <select class="form-control" name= "identity">
                                <option>user</option>
                                <option>admin</option>
                                <option>expert</option>
                            </select>
                        </div>
                        <div class="form-group" style="margin-top: 8%;">
                            <div class="col-sm-offset-4 col-sm-20">
                                <button type="submit" class="btn btn-default">Sign in</button>
                            </div>
                        </div>
                </form>`)
  }
} else {
  alert('Plase install MetaMask')
}

function getAccount() {
  return ethereum.request({ method: 'eth_requestAccounts' })
}
