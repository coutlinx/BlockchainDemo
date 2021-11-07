// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "things.sol";

contract Init is Thing {
    struct Admin {
        string name_linhao;
        address Admin_add_linhao;
        uint256 ID;
    }
    struct Expert {
        string name_linhao;
        address Admin_add_linhao;
        uint256 ID;
    }
    struct Owner {
        string name_linhao;
        address Admin_add_linhao;
        uint256 ID;
    }
    struct auction {
        uint256 Time_linhao;
        address owner_linhao;
        string objhash_linhao;
        uint256 end_Time_linhao;
    }

    Admin[] Admins_linhao;
    Expert[] Experts_linhao;
    Owner[] Owners_linhao;
    auction[] auctions_linhao; //结构体数组

    mapping(string => uint256) public OBJ_linhao; //物品hash与结构体id绑定
    mapping(string => uint256) public endTime_linhao; // 拍卖结束时间

    uint256 public hibest_bid_linhao; //最高出价者
    bool public startFlg_linhao; //开始标志
    bool public endFlg_linhao; //结束标志
}
