// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "init.sol";
contract Right is Init{
    
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
    modifier OnlyAdmin() {
        require(Admins_linhao[AdminMap_linhao[msg.sender]].Admin_add_linhao == msg.sender, "your have no right to do that!");
        _;
    }
    modifier OnlyExpert(){
        require(Experts_linhao[ExpertMap_linhao[msg.sender]].Expert_add_linhao == msg.sender,"your have no right to do that!");
        _;
    }
    modifier OnlyOwner(string memory Hash){
        require(Owners_linhao[OwnerMap_linhao[msg.sender]].Owner_add_linhao == auctions_linhao[OBJ_linhao[Hash]].owner_linhao,"your are not the owner" );
        _;
    }
}