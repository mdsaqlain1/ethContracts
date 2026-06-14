// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract StakeContract{
    uint public totalSupply;
    address SaqCoin;

    constructor(address _SaqCoin){
        SaqCoin = _SaqCoin;
    }
    struct userData{
        uint balance;
        uint lastUpdated;
        uint unclaimedReward;
    }

    mapping(address => userData) public data;

    function updateReward(address _to) internal {
        userData storage user = data[_to];

        if (user.lastUpdated == 0) {
            user.lastUpdated = block.timestamp;
            return;
        }

        uint256 reward = (block.timestamp - user.lastUpdated) * user.balance;

        user.unclaimedReward += reward;
        user.lastUpdated = block.timestamp;

    }

    function stake() external payable {
        require(msg.value > 0, "Required some ETH");

        if (data[msg.sender].balance > 0) {
            updateReward(msg.sender);
        } else {
            data[msg.sender].lastUpdated = block.timestamp;
        }

        data[msg.sender].balance += msg.value;
        totalSupply += msg.value;
    }


    function unstake(uint256 _amt) external {
        require(_amt > 0, "Amount must be greater than 0");
        require(
            data[msg.sender].balance >= _amt,
            "Insufficient staked balance"
        );

        updateReward(msg.sender);

        data[msg.sender].balance -= _amt;
        totalSupply -= _amt;

        payable(msg.sender).transfer(_amt);
    }


    function getReward(address _user)
        public
        view
        returns (uint256)
    {
        userData memory user = data[_user];

        uint256 pendingReward =
            (block.timestamp - user.lastUpdated) * user.balance;

        return user.unclaimedReward + pendingReward;
    }

    function claimReward() public {
        updateReward(msg.sender);

        uint reward = data[msg.sender].unclaimedReward;

        require(reward > 0, "No rewards available");

        IERC20(SaqCoin).transfer(msg.sender, reward);

        reward = 0;
        data[msg.sender].lastUpdated = block.timestamp;
    }
    
}