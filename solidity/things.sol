// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract Thing{
    //出价最高事件
    event HighBidEvt_linhao(address bidder, uint256 amount);

    //拍卖开始事件
    event AuctionStartEvt_linhao(address starter);

    //拍卖结束事件
    event AuctionEndedEvt_linhao(address winner, uint256 amount);

    //出价事件
    event BidEvt_linhao(address bidder, uint256 amount);
}
