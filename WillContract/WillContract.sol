// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WillContract{
    address public recipient;
    address public owner;
    uint public THRESHOLD = 365 days;
    uint lastPing;

    modifier _owner{
        require(msg.sender == owner);
        _;
    }

    modifier _recipient{
        require(msg.sender == recipient);
        _;
    }

    constructor(address _ownerAddress, address _recipientAddress){
        owner = _ownerAddress;
        recipient = _recipientAddress;
        lastPing = block.timestamp;
    }

    function deposit() public payable {

    }

    function transfer() external _recipient{
        require(block.timestamp - lastPing > THRESHOLD, "Too soon to transfer");
        (bool success, ) = payable(msg.sender).call{value : address(this).balance}("");
        require(success, "Transfer failed");
    }

    function pingIamAlive() external _owner{
        lastPing = block.timestamp;
    }

    function changeRecipient(address _recipientAddress) public _owner {
        recipient = _recipientAddress;
    } 

    function ownerWithdraw() public _owner{
        (bool success, ) = payable(owner).call{value : address(this).balance}("");
        require(success, "Transfer failed");
    }



}
