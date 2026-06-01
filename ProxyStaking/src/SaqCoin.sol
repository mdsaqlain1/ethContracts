// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract SaqCoin is ERC20{
    address public owner;
    constructor(string memory name, string memory symbol, address _owner) ERC20(name, symbol) {
        owner = _owner;
    }

    function mint( address _to, uint _value) public {
        require(owner == msg.sender);
        _mint(_to, _value);
    }

    function burn( address _from, uint _value) public{
        require(owner == msg.sender);
        _burn(_from, _value);
    }
}