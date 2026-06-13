// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable } from "../../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ProxyContract is Ownable{
    address implementation;

    constructor(address _implementation) Ownable(msg.sender){
        implementation = _implementation;
    }

    fallback() external{
        (bool success, ) = implementation.delegatecall(msg.data);
    }

    function setImplementation(address _implementation) public onlyOwner{
        implementation = _implementation;
    }

}