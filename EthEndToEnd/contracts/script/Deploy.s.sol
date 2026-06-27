// script/Deploy.s.sol
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SaqCoin.sol";
import "../src/StakeContract.sol";

contract Deploy is Script {
    function run() external {
        uint256 key = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(key);

        SaqCoin saqCoin = new SaqCoin(address(0));

        StakeContract stakeContract = new StakeContract(address(saqCoin));

        saqCoin.setStakingContract(address(stakeContract));

        vm.stopBroadcast();

        console.log("SaqCoin:", address(saqCoin));
        console.log("StakeContract:", address(stakeContract));
    }
}