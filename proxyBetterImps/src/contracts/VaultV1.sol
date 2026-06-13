// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../lib/openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";

contract VaultV1 is Initializable {
    address public owner;

    function initialize(address _owner)
        external
        initializer
    {
        owner = _owner;
    }
}