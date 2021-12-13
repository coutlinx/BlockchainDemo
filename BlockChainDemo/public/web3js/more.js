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
            <button type="button" class="btn btn-default" style="margin-left: 40%;background-color: black; color: aliceblue;" onclick ="valuation(this)">估值</button>
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
      url: 'http://localhost:3000/more/GetUnstartauthion',
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
            <button type="button" class="btn btn-default" style="margin-left: 40%;background-color: black; color: aliceblue;" onclick="start(this)">开始</button>
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
            <button type="button" class="btn btn-default" style="margin-left: 40%;background-color: black; color: aliceblue;" onclick="end(this)">结束</button>
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

function valuation(e) {
  console.log(e.parentNode.children[1].innerHTML)
  Hash = e.parentNode.children[1].innerHTML.split('HASH:')
  Hash = Hash[1]
  console.log(Hash)
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/more/getAuthion',
    dataType: 'json',
    data: { HASH: Hash },
    success: function (data) {
      authion = $.parseJSON(data.Authion)
      console.log(data.Value,data)
      table = `
        <div id="addcase" class="modal inmodal" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <h4 class="modal-title">简介</h4>
                      </div>
                      <div class="modal-body">
                        <div class="row">
                          <div class="col-4">
                            <div class="list-group" id="list-tab" role="tablist">
                              <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list"
                                href="#list-home" role="tab" aria-controls="home">Hash</a>
                              <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"
                                href="#list-profile" role="tab" aria-controls="profile">简介</a>
                              <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list"
                                href="#list-messages" role="tab" aria-controls="messages">价格</a>
                              <a class="list-group-item list-group-item-action" id="list-nameing-list" data-toggle="list"
                                href="#list-nameing" role="tab" aria-controls="nameing">名字</a>
                              <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list"
                                href="#list-settings" role="tab" aria-controls="settings">估值</a>
                            </div>
                          </div>
                          <div class="col-8">
                            <div class="tab-content" id="nav-tabContent">
                              <div class="tab-pane fade show active" id="list-home" role="tabpanel"
                                aria-labelledby="list-home-list" style=" overflow: hidden;
                                text-overflow: ellipsis;">${authion[0].Hash}</div>
                              <div class="tab-pane fade" id="list-profile" role="tabpanel"
                                aria-labelledby="list-profile-list">${authion[0].about}</div>
                              <div class="tab-pane fade" id="list-messages" role="tabpanel"
                                aria-labelledby="list-messages-list">${data.Value[2]}</div>
                              <div class="tab-pane fade" id="list-nameing" role="tabpanel"
                                aria-labelledby="list-nameing-list">${authion[0].name}</div>
                                <div class="tab-pane fade" id="list-settings" role="tabpanel"
                                aria-labelledby="list-settings-list"><input id="val"class="form-control" type="text" placeholder="请输入您的估值"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <div class="form-group">
                          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                          <button type="submit" class="btn btn-primary" onclick = "submit()">确认</button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>`
      $('#alter').html(table)
      $('#addcase').modal('show')
    },
    error: function (data) {
      console.log(data)
    },
  })
}

async function submit() {
  Hash = $('#list-home').html()
  acc = await getAccount()
  acc = acc[0]
  value = $("#val").val()
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/more/val',
    dataType: 'json',
    data: { HASH: Hash,acc:acc,value:value},
    success: function(data){
      console.log(data)
      location.reload()
    },
    error:function(data){
      console.log(data)
    }
  })
}

async function start(e){
  Hash = e.parentNode.children[1].innerHTML.split('HASH:')[1]
  acc = await getAccount()
  acc = acc[0]
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/more/start',
    dataType: 'json',
    data: { HASH: Hash,ACC:acc},
    success:function(data){
      console.log(data)
      returns = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">开始拍卖</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item" style="text-overflow:ellipsis;overflow: hidden;">blockHash:${data.information.blockHash}</li>
                        <li class="list-group-item list-group-item-primary" style="text-overflow:ellipsis;overflow: hidden;">blockNumber:${data.information.blockNumber}</li>
                        <li class="list-group-item list-group-item-secondary" style="text-overflow:ellipsis;overflow: hidden;">contractAddress:${data.information.contractAddress}</li>
                        <li class="list-group-item list-group-item-success" style="text-overflow:ellipsis;overflow: hidden;">cumulativeGasUsed:${data.information.cumulativeGasUsed}</li>
                        <li class="list-group-item list-group-item-danger" style="text-overflow:ellipsis;overflow: hidden;">from:${data.information.from}</li>
                        <li class="list-group-item list-group-item-warning" style="text-overflow:ellipsis;overflow: hidden;">gasUsed:${data.information.gasUsed}</li>
                        <li class="list-group-item list-group-item-info" style="text-overflow:ellipsis;overflow: hidden;">to:${data.information.to}</li>
                        <li class="list-group-item list-group-item-light" style="text-overflow:ellipsis;overflow: hidden;">transactionHash:${data.information.transactionHash}</li>
                        <li class="list-group-item list-group-item-dark" style="text-overflow:ellipsis;overflow: hidden;">logsBloom:${data.information.logsBloom}</li>
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
    error:function(data){
      console.log(data)
    }
  })
}

async function end(e){
  Hash = e.parentNode.children[1].innerHTML.split('HASH:')[1]
  acc = await getAccount()
  acc = acc[0]
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/more/end',
    dataType: 'json',
    data: { HASH: Hash,ACC:acc},
    success:function(data){
      console.log(data)
      returns = `<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">结束拍卖</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item" style="text-overflow:ellipsis;overflow: hidden;">blockHash:${data.information.blockHash}</li>
                        <li class="list-group-item list-group-item-primary" style="text-overflow:ellipsis;overflow: hidden;">blockNumber:${data.information.blockNumber}</li>
                        <li class="list-group-item list-group-item-secondary" style="text-overflow:ellipsis;overflow: hidden;">contractAddress:${data.information.contractAddress}</li>
                        <li class="list-group-item list-group-item-success" style="text-overflow:ellipsis;overflow: hidden;">cumulativeGasUsed:${data.information.cumulativeGasUsed}</li>
                        <li class="list-group-item list-group-item-danger" style="text-overflow:ellipsis;overflow: hidden;">from:${data.information.from}</li>
                        <li class="list-group-item list-group-item-warning" style="text-overflow:ellipsis;overflow: hidden;">gasUsed:${data.information.gasUsed}</li>
                        <li class="list-group-item list-group-item-info" style="text-overflow:ellipsis;overflow: hidden;">to:${data.information.to}</li>
                        <li class="list-group-item list-group-item-light" style="text-overflow:ellipsis;overflow: hidden;">transactionHash:${data.information.transactionHash}</li>
                        <li class="list-group-item list-group-item-dark" style="text-overflow:ellipsis;overflow: hidden;">logsBloom:${data.information.logsBloom}</li>
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
    error:function(data){
      console.log(data)
    }
  })
}