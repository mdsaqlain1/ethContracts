// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";


contract LockNstake{
    address public tokenAddress;
    mapping(address => uint) public balanceOf;

    constructor(address _tokenAddress){
        tokenAddress = _tokenAddress;
    }

    function stake(address _tokenAdress, uint _amt) public{
        require(_tokenAdress == tokenAddress);
        require(IERC20(_tokenAdress).allowance(msg.sender, address(this)) >= _amt);
        require(IERC20(_tokenAdress).transferFrom(msg.sender, address(this), _amt));
        balanceOf[msg.sender] += _amt;
    }

    function unStake(uint _amt) public{
        require(balanceOf[msg.sender] >= _amt);
        require(IERC20(tokenAddress).transfer(msg.sender, _amt));
        balanceOf[msg.sender] -= _amt;
    }
}