// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SaqCoin is ERC20, Ownable{

    address public stakingContract;

    error OnlyStakingContract();
    error InvalidAddress();


    constructor(address _stakingContract) ERC20("SAQCOIN", "SAQ") Ownable(msg.sender){
        stakingContract = _stakingContract;
    }

    function mint(address _to, uint _amt) external{
        if (msg.sender != stakingContract) {
            revert OnlyStakingContract();
        }
        _mint(_to, _amt);
    }

    function setStakingContract(address _stakingContract) external onlyOwner {
        if (_stakingContract == address(0)) {
            revert InvalidAddress();
        }
        stakingContract = _stakingContract;
    }
}