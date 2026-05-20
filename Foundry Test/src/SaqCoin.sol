// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SaqCoin is ERC20{
    address public owner;
    constructor(string memory name, string memory symbol, address _owner) ERC20(name, symbol) {
        owner = _owner;
    }

    function mint( address _to, uint _value) public {
        require(msg.sender == owner);
        _mint(_to, _value);
    }
}