import React from 'react'
import { stakingABI } from '../ABI/StakingContract.ts'
import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem' // Optional: for formatting bigints to readable numbers

const Dashboard2 = () => {
  const { address, isConnected } = useAccount(); 

  const { data: userData, error, isPending } = useReadContract({
    abi: stakingABI,
    address: '0x1BC8E5AD4eCCC6Acc7C4a2aED9EEfA26d7758dA8', 
    functionName: 'data',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address, 
    }
  })

  const { data: reward, error: rewardError, isPending: isRewardLoading } = useReadContract({
  abi: stakingABI,
  address: '0x1BC8E5AD4eCCC6Acc7C4a2aED9EEfA26d7758dA8', 
  functionName: 'getReward',
  args: address ? [address] : undefined,
  query: {
    enabled: !!address, 
  }
})

    const rewardData = reward;
  const [balance, lastUpdated, unclaimedReward] = userData || [0n, 0n, 0n];

  if (!isConnected) {
    return <div>Please connect your wallet.</div>
  }

  if (isPending) {
    return <div>Loading staking data...</div>
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>
  }

  return (
    <div>
      {/* Staking details card */}
      <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
        <p><strong>Total Staked:</strong> {formatEther(balance)} ETH</p>
        <p><strong>Unclaimed Rewards:</strong> {formatEther(unclaimedReward)} ETH</p>
        <p><strong>Last Updated Reward:</strong> {formatEther(rewardData)}</p>
      </div>
    </div>
  )
}

export default Dashboard2