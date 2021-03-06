// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./safeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract Auction {
    using SafeMath for uint256;
    struct Admin_linhao {
        string name_linhao;
        address Admin_add_linhao;
        uint256 ID;
    }
    struct Expert_linhao {
        string name_linhao;
        address Expert_add_linhao;
        uint256 ID;
    }
    struct Owner_linhao {
        string name_linhao;
        address Owner_add_linhao;
        uint256 ID;
    }
    struct auction_linhao {
        address owner_linhao;
        string objhash_linhao;
        uint256 value_linhao;
    }
    address ERC20_address_linhao;

    Admin_linhao[] Admins_linhao;
    Expert_linhao[] Experts_linhao;
    Owner_linhao[] Owners_linhao;
    auction_linhao[] auctions_linhao; //结构体数组

    mapping(string => uint256) public OBJ_linhao; //物品hash与结构体id绑定
    mapping(address => string[]) public ObjMap_linhao;
    mapping(address => uint256) public OwnerMap_linhao;
    mapping(address => uint256) public AdminMap_linhao;
    mapping(address => uint256) public ExpertMap_linhao;
    mapping(string => uint256) public values_linhao;
    mapping(string => bool) public startFlg_linhao;
    mapping(string => uint256) public starTime_linhao;
    mapping(string => uint256) public Aution_value_linhao;
    mapping(string => uint256) public hibest_bid_linhao;
    mapping(string => address) public hibest_bider_linhao; //最高出价

    constructor(address ERC20_address) {
        ERC20_address_linhao = ERC20_address;
        Admin_linhao memory ROOT = Admin_linhao({
            name_linhao: "ROOT",
            Admin_add_linhao: msg.sender,
            ID: 0
        });
        Admins_linhao.push(ROOT);
    }

    //竞拍函数
    function ObjBit(string memory Hash, uint256 money)
        public
        IsEnding(Hash)
        LowerPrice(Hash, money)
        Enough_Token(IERC20(ERC20_address_linhao).balanceOf(msg.sender), money)
    {
        hibest_bid_linhao[Hash] = money;
        hibest_bider_linhao[Hash] = msg.sender;
        Aution_value_linhao[Hash] = money;
        emit HighBidEvt_linhao(msg.sender, money);
    }

    function StartAution(string memory Hash) public OnlyAdmin {
        starTime_linhao[Hash] = block.timestamp;
        startFlg_linhao[Hash] = true;
        hibest_bid_linhao[Hash] = Aution_value_linhao[Hash];
        
        emit AuctionStartEvt_linhao(Hash);
    }

    function EndingAuthion(string memory Hash) public OnlyAdmin {
        require(
            block.timestamp.sub(starTime_linhao[Hash]) >= 60 seconds,
            "it not ending!"
        );
        startFlg_linhao[Hash] = false;
        starTime_linhao[Hash] = 0;
        auctions_linhao[OBJ_linhao[Hash]].value_linhao = hibest_bid_linhao[Hash];
    }

    function valuation(string memory Hash, uint256 value) public OnlyExpert {
        values_linhao[Hash] = value;
        emit Valuation_Over_linhao(Hash, value);
    }

    function lookValue(string memory Hash) public view returns (uint256) {
        return values_linhao[Hash];
    }

    function changeValue(string memory Hash, uint256 value)
        public
        OnlyOwner(Hash)
    {
        auctions_linhao[OBJ_linhao[Hash]].value_linhao = value;
        Aution_value_linhao[Hash] = value;
        values_linhao[Hash] = value;
        auctions_linhao[OBJ_linhao[Hash]].value_linhao = Aution_value_linhao[Hash];
        emit Owner_SetValue(Hash);
    }

    function OwenrChange(address NewOwner, string memory Hash)
        public
        OnlyAdmin
    {
        string[] memory OldOwner = ObjMap_linhao[
            auctions_linhao[OBJ_linhao[Hash]].owner_linhao
        ];
        for (uint256 i = 0; i < OldOwner.length; i++) {
            if (
                keccak256(abi.encode(OldOwner[i])) ==
                keccak256(abi.encode(Hash))
            ) {
                delete ObjMap_linhao[
                    auctions_linhao[OBJ_linhao[Hash]].owner_linhao
                ][i];
            }
        }
        ObjMap_linhao[NewOwner].push(Hash);
        auctions_linhao[OBJ_linhao[Hash]].owner_linhao = NewOwner;
    }

    function MyAuctions() public view returns (string[] memory) {
        return ObjMap_linhao[msg.sender];
    }

    function SetAdmin(address Admin_addr, string memory Admin_name)
        public
        OnlyAdmin
        returns (uint256)
    {
        Admin_linhao memory setAdmin = Admin_linhao({
            name_linhao: Admin_name,
            Admin_add_linhao: Admin_addr,
            ID: 0
        });
        Admins_linhao.push(setAdmin);
        uint256 ID = Admins_linhao.length.sub(1);
        Admins_linhao[ID].ID = ID;
        AdminMap_linhao[Admin_addr] = ID;
        return ID;
    }

    function SetExpre(address Expert_addr, string memory Expert_name)
        public
        OnlyAdmin
        returns (uint256)
    {
        Expert_linhao memory expert = Expert_linhao({
            name_linhao: Expert_name,
            Expert_add_linhao: Expert_addr,
            ID: 0
        });
        Experts_linhao.push(expert);
        uint256 ID = Experts_linhao.length.sub(1);
        Experts_linhao[ID].ID = ID;
        ExpertMap_linhao[Expert_addr] = ID;
        return ID;
    }

    function SetOwner(string memory OwnerName, address Owner_addr)
        public
        OnlyAdmin
        returns (uint256)
    {
        Owner_linhao memory owner = Owner_linhao({
            name_linhao: OwnerName,
            Owner_add_linhao: Owner_addr,
            ID: 0
        });
        Owners_linhao.push(owner);
        uint256 ID = Owners_linhao.length.sub(1);
        Owners_linhao[ID].ID = ID;
        OwnerMap_linhao[Owner_addr] = ID;
        return ID;
    }

    function SetAution(string memory Hash, uint256 money) public {
        auction_linhao memory auc = auction_linhao({
            owner_linhao: msg.sender,
            objhash_linhao: Hash,
            value_linhao: money
        });
        auctions_linhao.push(auc);
        OBJ_linhao[Hash] = auctions_linhao.length.sub(1);
        ObjMap_linhao[msg.sender].push(Hash);
    }

    //ERC20==============================
    function Get_Contract_Balance() public view returns (uint256) {
        return (IERC20(ERC20_address_linhao).balanceOf(address(this)));
    }

    function Pay_value(string memory Hash) public OnlyBuyer(Hash) {
        IERC20(ERC20_address_linhao).transferFrom(
            msg.sender,
            address(this),
            Aution_value_linhao[Hash]
        );
    }

    function withdraw(string memory Hash) public OnlyOwner(Hash) {
        IERC20(ERC20_address_linhao).transfer(
            msg.sender,
            Aution_value_linhao[Hash]
        );
    }

    function GetOwner(address Addr) public view returns (uint256, bool) {
        require(Owners_linhao[OwnerMap_linhao[Addr]].Owner_add_linhao == Addr);
        return (OwnerMap_linhao[Addr], true);
    }

    function GetAdmin(address Addr) public view returns (uint256, bool) {
        require(Admins_linhao[AdminMap_linhao[Addr]].Admin_add_linhao == Addr);
        return (AdminMap_linhao[Addr], true);
    }

    function GetExpert(address Addr) public view returns (uint256, bool) {
        require(
            Experts_linhao[ExpertMap_linhao[Addr]].Expert_add_linhao == Addr
        );
        return (ExpertMap_linhao[Addr], true);
    }

    function GetHighestAuthion(string memory Hash)
        public
        view
        returns (uint256)
    {
        return values_linhao[Hash];
    }

    function GetStartAuthion(string memory Hash) public view returns (bool) {
        return startFlg_linhao[Hash];
    }

    function GetAuthion(string memory Hash)public view returns(auction_linhao memory){
        return auctions_linhao[OBJ_linhao[Hash]];
    }
    modifier LowerPrice(string memory Hash, uint256 money) {
        require(
            hibest_bid_linhao[Hash] < money,
            "Your bid is lower than the low price"
        );
        _;
    }

    modifier IsEnding(string memory Hash) {
        require(startFlg_linhao[Hash], "the authion is ending");
        _;
    }
    modifier OnlyAdmin() {
        require(
            Admins_linhao[AdminMap_linhao[msg.sender]].Admin_add_linhao ==
                msg.sender,
            "your have no right to do that!"
        );
        _;
    }
    modifier OnlyExpert() {
        require(
            Experts_linhao[ExpertMap_linhao[msg.sender]].Expert_add_linhao ==
                msg.sender,
            "your have no right to do that!"
        );
        _;
    }
    modifier OnlyOwner(string memory Hash) {
        require(
            Owners_linhao[OwnerMap_linhao[msg.sender]].Owner_add_linhao ==
                auctions_linhao[OBJ_linhao[Hash]].owner_linhao,
            "your are not the owner"
        );
        _;
    }
    modifier Enough_Token(uint256 Token, uint256 value) {
        require(value < Token, "your have not enough money to pay that!");
        _;
    }
    modifier OnlyBuyer(string memory Hash) {
        require(
            hibest_bider_linhao[Hash] == msg.sender,
            "your are not the buyer"
        );
        _;
    }

    //出价最高事件
    event HighBidEvt_linhao(address bidder, uint256 amount);

    //拍卖开始事件
    event AuctionStartEvt_linhao(string Hash);

    //拍卖结束事件
    event AuctionEndedEvt_linhao(address winner, uint256 amount);

    //出价事件
    event BidEvt_linhao(address bidder, uint256 amount);

    //估价完成事件
    event Valuation_Over_linhao(string Hash, uint256 value);

    //客户接受或更改估价
    event Owner_SetValue(string Hash);
}
