// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Auction {
    struct auction {
        uint256 Time_linhao;
        address owner_linhao;
        string objhash_linhao;
        uint256 end_Time_linhao;
    }
    address[] Admin;
    mapping(string => uint256) public OBJ_linhao; //物品hash与结构体id绑定
    auction[] auctions_linhao; //结构体数组
    mapping(string => uint256) public endTime_linhao; // 拍卖结束时间
    uint256 public hibest_bid_linhao; //最高出价者
    bool public startFlg_linhao; //开始标志
    bool public endFlg_linhao; //结束标志

    //出价最高事件
    event HighBidEvt_linhao(address bidder, uint256 amount);

    //拍卖开始事件
    event AuctionStartEvt_linhao(address starter);

    //拍卖结束事件
    event AuctionEndedEvt_linhao(address winner, uint256 amount);

    //出价事件
    event BidEvt_linhao(address bidder, uint256 amount);

    function startAution(
        address onwer,
        string memory Hash,
        uint256 endTime
    ) public {
        auction memory auc = auction({
            owner_linhao: onwer,
            Time_linhao: block.timestamp,
            objhash_linhao: Hash,
            end_Time_linhao: endTime
        });
        auctions_linhao.push(auc);
        startFlg_linhao = true;
        endFlg_linhao = false;
        endTime_linhao[Hash] = endTime;
        OBJ_linhao[Hash] = auctions_linhao.length - 1;
        emit AuctionStartEvt_linhao(onwer);
    }

    modifier LowerPrice() {
        require(
            hibest_bid_linhao < msg.value,
            "Your bid is lower than the low price"
        );
        _;
    }

    modifier IsEnding(string memory Hash) {
        require(endFlg_linhao && !startFlg_linhao, "the authion is ending");
        _;
    }
    modifier OnlyAdmin(uint256 id) {
        require(msg.sender == Admin[id], "your have no right to do that!");
        _;
    }

    //竞拍函数
    function ObjBit(string memory Hash)
        public
        payable
        IsEnding(Hash)
        LowerPrice
    {
        hibest_bid_linhao = msg.value;
        emit HighBidEvt_linhao(msg.sender, msg.value);
    }

    function OwenrChange(address NewOwner, string memory Hash)
        public
        IsEnding(Hash)
    {
        auctions_linhao[OBJ_linhao[Hash]].owner_linhao = NewOwner;
    }

    function EndingAuthion(uint256 AdminID, string memory Hash)
        public
        OnlyAdmin(AdminID)
        returns (bool)
    {
        if (
            auctions_linhao[OBJ_linhao[Hash]].Time_linhao - block.timestamp ==
            auctions_linhao[OBJ_linhao[Hash]].end_Time_linhao
        ) {
            endFlg_linhao = true;
            startFlg_linhao = false;
            return true;
        } else {
            return false;
        }
    }
}
