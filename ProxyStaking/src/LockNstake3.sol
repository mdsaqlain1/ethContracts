// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {SaqCoin} from "./SaqCoin.sol";


contract LockNstake3{
    address public tokenAddress;
    mapping(address => uint) public balanceOf;
    SaqCoin saqCoin;
    struct Withdrawals {
        uint256 amount;
        uint256 unlockTime;
    }
    mapping(address => Withdrawals[]) public withdrawal;

    constructor(address _tokenAddress){
        tokenAddress = _tokenAddress;
        saqCoin = new SaqCoin("SaqCoin","SAQ", address(this));
    }

    function stake(address _tokenAdress, uint _amt) public{
        require(_tokenAdress == tokenAddress);
        require(IERC20(_tokenAdress).allowance(msg.sender, address(this)) >= _amt);
        require(IERC20(_tokenAdress).transferFrom(msg.sender, address(this), _amt));
        balanceOf[msg.sender] += _amt;
        saqCoin.mint(msg.sender, _amt);
    }

    function unStake(uint _amt) public{
        require(balanceOf[msg.sender] >= _amt);
        balanceOf[msg.sender] -= _amt;
        saqCoin.burn(msg.sender, _amt);

        withdrawal[msg.sender].push(
            Withdrawals({
                amount : _amt,
                unlockTime : block.timestamp + 21 days
            })
        );
    }

    function claim(uint index) public {
        Withdrawals storage request = withdrawal[msg.sender][index];

        require( 
            block.timestamp >= request.unlockTime,  "Still locked"
        );

        require(request.amount > 0, "Already Claimed!!" );

        uint256 amount = request.amount;
        request.amount = 0;

        require(IERC20(tokenAddress).transfer(msg.sender, amount));

    }
    
}