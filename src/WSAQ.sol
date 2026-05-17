// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract WSAQ is ERC20, Ownable{
    constructor() ERC20("WRAPPEDSAQ","WSAQ") Ownable(msg.sender){

    }

    function mint(address _to, uint _amt) public onlyOwner{
        _mint(_to, _amt);
    } 

    function burn(address _from, uint _amt) public {
        _burn(_from, _amt);
    } 
}