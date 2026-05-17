// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeSaq is Ownable{
    address public tokenAdress;
    mapping(address => uint) public pendingBalances;
    constructor(address _tokenAdress) Ownable(msg.sender){
        tokenAdress = _tokenAdress;
    }

    event Lock(address indexed _from, uint _amt);
    event Unlock(address indexed _from, uint _amt);

    function lock(address _token, uint _amt) public{
        require(tokenAdress == _token);
        require(IERC20(tokenAdress).allowance(msg.sender, address(this)) >=_amt);
        require(IERC20(tokenAdress).transferFrom(msg.sender, address(this), _amt));
        emit Lock(msg.sender, _amt);
    }

    function unlock(uint _amt) public{
        require(pendingBalances[msg.sender] >= _amt);
        require(IERC20(tokenAdress).transfer(msg.sender, _amt));
        pendingBalances[msg.sender] -= _amt;
        emit Unlock(msg.sender, _amt);
    }

    function burnOnOtherSide(uint _amt) public{
        pendingBalances[msg.sender] += _amt;
    }
}