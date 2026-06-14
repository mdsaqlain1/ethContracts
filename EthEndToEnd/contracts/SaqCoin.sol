// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract SaqCoin is ERC20{
    address public stakingContract;
    constructor(address _stakingContract) ERC20("SAQCOIN", "SAQ"){
        stakingContract = _stakingContract;
    }

    function mint(address _to, uint _amt) external{
        require(msg.sender == stakingContract);
        _mint(_to, _amt);
    }
}