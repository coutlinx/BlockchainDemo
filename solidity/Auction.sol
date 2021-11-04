pragma solidity ^0.8.0;

contract Auction{
    struct auction{
        uint Time_linhao;
        address owner_add_linhao;
        string objhash_linhao;
    }
    uint public start_time_linhao;
    uint public hibest_bid_linhao;
    bool public startFlg;
    bool public endFlg;
    
    event HighBidEvt_linhao(address bidder, uint amount);
	
	//拍卖开始事件
    event AuctionStartEvt_linhao(address starter);
	
    //拍卖结束事件
    event AuctionEndedEvt_linhao(address winner, uint amount);

	//出价事件
    event BidEvt_linhao(address bidder, uint amount);
}
