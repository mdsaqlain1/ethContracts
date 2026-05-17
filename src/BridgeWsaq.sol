// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface Token is IERC20{
    function mint(address _to, uint _amt) external;
    function burn(address _from, uint _amt) external;
}

contract Wsaq is Ownable{
    uint public balance;
    address public tokenAddress;
    mapping(address => uint) public pendingBalances;

    event Burn(address _from, uint _amt);

    constructor(address _tokenAddress) Ownable(msg.sender){
        tokenAddress = _tokenAddress;
    }

    function withdraw(address _tokenAdrress, uint _amt) public{
        require(pendingBalances[msg.sender] >= _amt);
        require(tokenAddress == _tokenAdrress);
        pendingBalances[msg.sender] -= _amt;
        Token(_tokenAdrress).mint(msg.sender, _amt);
    }
    function burn(address _tokenAdrress, uint _amt) public{
        require(pendingBalances[msg.sender] >= _amt);
        require(tokenAddress == _tokenAdrress);
        Token(_tokenAdrress).burn(msg.sender, _amt);
        emit Burn(msg.sender, _amt);
    }
    function lockOnOtherSide(address userAcc, uint _amt) public {
        pendingBalances[userAcc] += _amt;
    }
}