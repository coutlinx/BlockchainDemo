if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!')
  $(document).ready(
    getAccount().then((res) => {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/self/setaddr',
        data: { ACC: res[0] },
        dataType: 'json',
        success: function (data) {
          console.log(data)
          // location.reload()
        },
        error: function (data) {
          console.log(data)
        },
      })
    }),
  )
} else {
  alert('plase install the MetaMask')
}
function getAccount() {
  return ethereum.request({ method: 'eth_requestAccounts' })
}
if ($('#val').val() == '') {
  console.log($('#val').val())
} else {
  obj = ''
  authion = $.parseJSON('[' + $('#val').val() + ']')
  console.log(authion)
  for (let i = 0; i < authion[0].length; i++) {
    obj += `<div class="mainOBJ" onclick = "more(this)">
    <img
        src="https://rukminim1.flixcart.com/image/714/857/kb2jmvk0/necklace-chain/v/r/a/simple-chain-chain-vien-original-imafsg7w4a5a6hhm.jpeg?q=50">
    <span style=" overflow: hidden;
    text-overflow: ellipsis;">HASH:${authion[0][i].Hash}</span>
  </div>`
  }
  $('.main_content').html(obj)
}

async function more(e) {
  acc = await getAccount()
  Hash = e.children[1].innerHTML.split('HASH:')[1]
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/self/more',
    data: { HASH: Hash, ACC: acc[0] },
    dataType: 'json',
    success: function (data) {
      console.log(data)
      if (data.Status == 0) {
        $('.modal-content').html(`
            <div class="modal-header">
            <h4 class="modal-title">拍卖结束</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                            <li class="list-group-item">恭喜竞拍成功</li>
                            <li class="list-group-item" id="value">您的价格:${data.Value}</li>
                            <li class="list-group-item list-group-item-primary" id="HASH" style="text-overflow:ellipsis;overflow: hidden;">物品Hash:${data.Hash} </li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group">
                                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                                <button type="submit" class="btn btn-primary" onclick="pay()">确定</button>
                            </div>
                        </div>`)
        $('#addcase').modal('show')
      } else if (data.Status == 1) {
        $('.modal-content').html(`
            <div class="modal-header">
            <h4 class="modal-title">拍卖结束</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                                
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                            <li class="list-group-item">竞拍失败</li>
                            <li class="list-group-item list-group-item-primary" id="HASH" style="text-overflow:ellipsis;overflow: hidden;">物品Hash:${data.Hash} </li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group">
                                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                                <button type="submit" class="btn btn-primary">确定</button>
                            </div>
                        </div>`)
        $('#addcase').modal('show')
      } else {
        $('.modal-content').html(`
            <div class="modal-header">
            <h4 class="modal-title">正在拍卖</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                        
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                            <li class="list-group-item list-group-item-primary" id="HASH" style="text-overflow:ellipsis;overflow: hidden;">物品Hash:${data.Hash} </li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <div class="form-group">
                                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">关闭</button>
                                <button type="submit" class="btn btn-primary" onclick="confirm()">进入拍卖</button>
                            </div>
                        </div>`)
        $('#addcase').modal('show')
      }
    },
    error: function (data) {
      console.log(data)
    },
  })
}

function confirm() {
  Hash = $('#HASH').val()
  url = `http://localhost:3000/authion/${Hash}`
  console.log(url)
  window.location.href = url
}

async function pay() {
  TokenABI = [
    {
      inputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'symbol',
          type: 'string',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'subtractedValue',
          type: 'uint256',
        },
      ],
      name: 'decreaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getDEcimals',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'addedValue',
          type: 'uint256',
        },
      ],
      name: 'increaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]
  AuthionABI = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'ERC20_address',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'winner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'AuctionEndedEvt_linhao',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'AuctionStartEvt_linhao',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'BidEvt_linhao',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'HighBidEvt_linhao',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'Owner_SetValue',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Valuation_Over_linhao',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'AdminMap_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'Aution_value_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'EndingAuthion',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'ExpertMap_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'Addr',
          type: 'address',
        },
      ],
      name: 'GetAdmin',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'GetAuthion',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'owner_linhao',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'objhash_linhao',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'value_linhao',
              type: 'uint256',
            },
          ],
          internalType: 'struct Auction.auction_linhao',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'Addr',
          type: 'address',
        },
      ],
      name: 'GetExpert',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'GetHighestAuthion',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'Addr',
          type: 'address',
        },
      ],
      name: 'GetOwner',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'GetStartAuthion',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'Get_Contract_Balance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MyAuctions',
      outputs: [
        {
          internalType: 'string[]',
          name: '',
          type: 'string[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'OBJ_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'money',
          type: 'uint256',
        },
      ],
      name: 'ObjBit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'ObjMap_linhao',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'NewOwner',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'OwenrChange',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'OwnerMap_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'Pay_value',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'Admin_addr',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'Admin_name',
          type: 'string',
        },
      ],
      name: 'SetAdmin',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'money',
          type: 'uint256',
        },
      ],
      name: 'SetAution',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'Expert_addr',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'Expert_name',
          type: 'string',
        },
      ],
      name: 'SetExpre',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'OwnerName',
          type: 'string',
        },
        {
          internalType: 'address',
          name: 'Owner_addr',
          type: 'address',
        },
      ],
      name: 'SetOwner',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'StartAution',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'changeValue',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'hibest_bid_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'hibest_bider_linhao',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'lookValue',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'starTime_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'startFlg_linhao',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'valuation',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      name: 'values_linhao',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'Hash',
          type: 'string',
        },
      ],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]
  Hash = $('#HASH').html().split('物品Hash:')[1]
  
  value = $('#value').html().split('您的价格:')[1]
  acc = await getAccount()
  web3 = new Web3('ws://localhost:7545')
  var tokenContract = new web3.eth.Contract(
    TokenABI,
    '0x242BC188A9FD3fd19d255f52DcA91Be9989b7547',
  )
  var AuthionContract = new web3.eth.Contract(
    AuthionABI,
    '0x97d1A04a53eAFF37cE5a32Df7Ee7AcE57d58E392',
  )
  a = "0xbb7f07f54ef7f16ccdde483c6d4b3c92c6df0eefbe4c3608040c82c74c5dba0a"
  console.log(typeof(Hash),typeof(a))
  tokenContract.methods
    .approve('0x97d1A04a53eAFF37cE5a32Df7Ee7AcE57d58E392', value)
    .send({ from: acc[0]})
    .then(console.log)
  AuthionContract.methods
    .Pay_value("0xa1b81916b220986d104612ba33a1d92d86fcdfe557b4231362b45af8a8b52a0b")
    .send({ from: acc[0] })
    .on('transactionHash', function (hash) {
      console.log("transactionHash >>> ", hash);
    })
    .on('receipt', function (receipt) {
      console.log("receipt >>> ", receipt);
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      console.log("confirmation confirmationNumber", confirmationNumber);
      console.log("confirmation receipt", receipt);
    }).catch(console.log)
}
