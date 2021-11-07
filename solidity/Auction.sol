pragma solidity ^0.8.0;

contract Auction{
    struct auction{
        uint Time_linhao;
        address owner_linhao;
        string objhash_linhao;
        uint end_Time_linhao;
    }
    mapping(string=>mapping(address=>address))public changeOwner_linhao;
    auction[] auctions_linhao;
    mapping(string=>uint)public endTime_linhao ;
    uint public start_time_linhao;
    uint public hibest_bid_linhao;
    bool public startFlg_linhao;
    bool public endFlg_linhao;

    //出价最高事件
    event HighBidEvt_linhao(address bidder, uint amount);
	
	//拍卖开始事件
    event AuctionStartEvt_linhao(address starter);
	
    //拍卖结束事件
    event AuctionEndedEvt_linhao(address winner, uint amount);

	//出价事件
    event BidEvt_linhao(address bidder, uint amount);
    
    function startAution (address onwer,string memory Hash,uint endTime)public {
    auction memory auc = auction({
          owner_linhao:onwer,
          Time_linhao: block.timestamp,
          objhash_linhao:Hash,
          end_Time_linhao:endTime
    }
        );
     auctions_linhao.push(auc);
     start_time_linhao = block.timestamp;
     startFlg_linhao = true;
     endTime_linhao[Hash]=endTime;
     emit AuctionStartEvt_linhao(onwer);
    }
    //竞拍函数
    function ObjBit(string memory Hash) public payable{
        require(endTime_linhao[Hash] - block.timestamp<0 seconds,"the authion is ending");
        require(hibest_bid_linhao<msg.value,"Your bid is lower than the low price");
        hibest_bid_linhao = msg.value;
       emit  HighBidEvt_linhao(msg.sender,msg.value);
    }
    function (type name) {
        
    }
}
