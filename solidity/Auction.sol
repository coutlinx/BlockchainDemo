// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "right.sol";

contract Auction is Right {
    function submit_authion(
        address onwer,
        string memory Hash,
        uint256 endTime,
        uint256 money
    ) public {
        auction memory auc = auction({
            owner_linhao: onwer,
            Time_linhao: block.timestamp,
            objhash_linhao: Hash,
            end_Time_linhao: endTime,
            value_linhao: money
        });
        auctions_linhao.push(auc);
        startFlg_linhao = true;
        endFlg_linhao = false;
        endTime_linhao[Hash] = endTime;
        OBJ_linhao[Hash] = auctions_linhao.length - 1;
        ObjMap_linhao[msg.sender].push(Hash);
        emit AuctionStartEvt_linhao(onwer);
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

    function EndingAuthion(string memory Hash) public OnlyAdmin returns (bool) {
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

    function valuation(string memory Hash, uint256 value) public OnlyExpert {
        values_linhao[Hash] = value;
        emit Valuation_Over_linhao(Hash,value);
    }

    function changeValue(string memory Hash, uint256 value) public OnlyOwner(Hash) {
        auctions_linhao[OBJ_linhao[Hash]].value_linhao = value;
    }

    function lookValue(string memory Hash) public view returns (uint256) {
        return values_linhao[Hash];
    }

    function MyAuctions() public view returns (string[] memory) {
        return ObjMap_linhao[msg.sender];
    }
}
