// SPDX-License-Identifier: MIT

/*
 _____________________ 
|  _________________  |
| | Dinesh Jayasiri | |
| |_________________| |
|_____________________|
*/
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import '@openzeppelin/contracts/finance/PaymentSplitter.sol';
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// @author Dinesh Jayasiri
// @contact ywdinesh@gmail.com

contract BabyApe is ERC721Enumerable, Ownable, ReentrancyGuard, PaymentSplitter 
{
    using Strings for uint256;
    using Counters for Counters.Counter;


    uint256 public maxSupply = 20;

    string public baseURI; 
    string public notRevealedUri = "https://gateway.pinata.cloud/ipfs/QmQLkyc7G29MS2YPvCh2Gy2BqSMdEiCzeGmxQofiaku4XT";
    string public baseExtension = ".json";

    bool public paused = false;
    bool public revealed = false;
    bool public publicM = false;

    uint256 public publicsaleAmountLimit = 2;

    uint256 _price = 10000000000000000; // 0.01 ETH

    Counters.Counter private _tokenIds;

    uint256[] private _teamShares = [75,25]; // 2 PEOPLE IN THE TEAM
    address[] private _team = [
        0x8aA50Fd50beCA814AAF03D01A396854C0096B0f3,
        0xee9DAB72b81083C8Ba7836a4aeF16E74235487E1
    ];

    constructor(string memory uri)
        ERC721("BabyApe", "BAPE")
        PaymentSplitter(_team, _teamShares) // Split the payment based on the teamshares percentages
        ReentrancyGuard() // A modifier that can prevent reentrancy during certain functions
    {

        setBaseURI(uri);
    }

    function setBaseURI(string memory _tokenBaseURI) public onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function reveal() public onlyOwner {
        revealed = true;
    }

    modifier onlyAccounts () {
        require(msg.sender == tx.origin, "Not allowed origin");
        _;
    }


    function togglePause() public onlyOwner {
        paused = !paused;
    }


    function togglePublicSale() public onlyOwner {
        publicM = !publicM;
    }



    function publicSaleMint(uint256 _amount) 
    external 
    payable
    onlyAccounts
    {
        require(publicM,"BabyApe: PublicSale is OFF");
        require(!paused,"BabyApe: Contract is paused");
        require(_amount > 0,"BabyApe: zero amount");

        uint current = _tokenIds.current();

        require(
            current + _amount <= maxSupply,
            "BabyApe:Max supply exceeded"
        );
        require(
            _price * _amount <= msg.value,
            "BabyApe:Not enough ethers sent"
        );
        
        
        for (uint i = 0; i < _amount; i++) {
            mintInternal();
        }
    }

    function mintInternal() internal nonReentrant {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata:URI query for nonexistent token"
        );
        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
    
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function totalSupply() public view override  returns (uint) {
        return _tokenIds.current();
    }

    function tokensOwnedBy(address owner) public view returns (uint[] memory) {
    uint tokenCount = balanceOf(owner);
    uint[] memory ownedTokens = new uint[](tokenCount);
    for (uint i = 0; i < tokenCount; i++) {
        ownedTokens[i] = tokenOfOwnerByIndex(owner, i);
    }
    return ownedTokens;
}


}





