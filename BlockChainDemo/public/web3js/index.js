var Balance, Account
ABI = [
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
let web3 = new Web3('ws://localhost:7545')
var AuthionContract = new web3.eth.Contract(
  ABI,
  '0xe8b75688A739DD44540dA93da5d092cE34985452',
)

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
        data: { acc: Account },
        dataType: 'json',
        success: function (data) {
          if (data.alert == 'name') {
            console.log(1)
            $('#exampleModal').modal('show')
          }
          $('#accountBalance').html(
            parseInt(data.token / Math.pow(10, 18)) + 'LINX',
          )
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
    data: { acc: accounts[0] },
    dataType: 'json',
    success: function (data) {
      $('#accountAddress').html(accounts[0])
      $option = `<option>${accounts[0]}</option>`
      $('#bidAccount').append($option)
      $('#accountBalance').html(
        parseInt(data.token / Math.pow(10, 18)) + 'LINX',
      )
    },
    error: function (data) {
      console.log(data)
    },
  })
})
$('#makeBid').click(() => {
  Hash = $('.main_content').children()[2].innerHTML.split('HASH:')[1]
  addr = $('#accountAddress')[0].innerHTML
  value = $('#bidAmount').val()
  console.log(Hash)
  // bid(Hash, value, addr)
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/bid',
    data: { HASH:Hash,ADDDR:addr,VALUE:value},
    dataType: 'json',
    success:function(data){
      console.log(data)
    },
    error:function(data){
      console.log(data)
    }
  })
})
function bid(Hash, Value, addr) {
  AuthionContract.methods
    .ObjBit(Hash, Value)
    .send({
      from: addr,
    })
    .then(console.log)
}
