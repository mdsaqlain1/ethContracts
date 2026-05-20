// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "../src/SaqCoin.sol";

contract SaqCointTest is Test{
    SaqCoin c;

    function setUp() public{
        c = new SaqCoin("SaqCoin", "SAQ");
    }

    // function willRevert() public view {
    //     require(c.balanceOf(address(this)) == 1, "wrong balance");
    // }

    // function test_RevertWhen_inCorrectBalance() public {
    //     vm.expectRevert();
    //     this.willRevert(); 
    // }

    // function testPrank() public {
    //     c.mint(address(this), 100);

    //     assertEq(c.balanceOf(address(this)), 100, "ok");
    //     c.approve(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 50);

    //     vm.prank(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);

    //     c.transferFrom(address(this), 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 40);

    //     assertEq(c.balanceOf(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4), 40, "ok");
    // }

    //  function test_RevertIf_Prank() public {
    //     c.mint(address(this), 100);

    //     assertEq(c.balanceOf(address(this)), 100, "ok");
    //     c.approve(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 50);

    //     vm.prank(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);

    //     c.transferFrom(address(this), 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 40);

    //     vm.expectRevert();

    //     require(c.balanceOf(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4) == 45, "wrong");
    // }

    // function test_RevertIf_TransferFail() public {
    //     c.mint(address(this), 100);
    //     vm.expectRevert();
    //     c.transfer(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 110);
    // }

    function testDeal() public{
        vm.deal(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 100 ether);

        assertEq(address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4).balance, 100 ether, "ok");


    }
}