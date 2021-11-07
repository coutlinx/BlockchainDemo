// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "init.sol";

contract Right is Init {
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
        require(
            msg.sender == Admins[id].Admin_add_linhao,
            "your have no right to do that!"
        );
        _;
    }
}
