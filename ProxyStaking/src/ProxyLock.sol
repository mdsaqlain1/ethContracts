// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract ProxyLock{
    address implementation;

    constructor(address _implementation){
        implementation = _implementation;
    }

    fallback() external {
        (bool success, )=implementation.delegatecall(msg.data);
        require(success);
    }
}
