// script/Deploy.s.sol
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/SaqCoin.sol";
import "../src/StakeContract.sol";

contract Deploy is Script {
    function run() external {
        uint256 key = vm.envUint("PRIVATE_KEY");

        address saqCoinAddress = 0xC6755F226A5D20efbF80fb200d0c912DC45d21B4;
       
        vm.startBroadcast(key);

        SaqCoin saqCoin = SaqCoin(saqCoinAddress);

        StakeContract stakeContract = new StakeContract(saqCoinAddress);

        saqCoin.setStakingContract(address(stakeContract));

        vm.stopBroadcast();

        console.log("SaqCoin:", address(saqCoin));
        console.log("StakeContract:", address(stakeContract));
    }
}