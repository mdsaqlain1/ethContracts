// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {ProxyContract} from "../src/contracts/ProxyContract.sol";
import {VaultV1} from "../src/contracts/VaultV1.sol";

contract Proxttest is Test{
    ProxyContract proxy;
    VaultV1 implemention1;

    function setUp() public{
        implemention1 = new VaultV1();
        proxy = new ProxyContract(address(implemention1));
    }

    function testInit() public {
        VaultV1(address(proxy)).initialize(address(this));
    }
}