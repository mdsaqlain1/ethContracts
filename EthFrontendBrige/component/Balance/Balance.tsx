import React from 'react'
import { isAddress } from 'viem'
import { useConnection, useReadContract } from 'wagmi'

const Balance = () => {
    const {address, isConnected} = useConnection()
    const {data, isLoading, error} = useReadContract({
        address : "0xdac17f958d2ee523a2206206994597c13d831ec7",
        abi : [ {
          constant: true,
          inputs: [{ name: "who", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },],
        functionName : "balanceOf",
        args : address ? [address] : undefined,
        query :{
            enabled : !!address
        }

    })
   if (!isConnected) {
    return <div>Connect wallet</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      Balance: {data ? Number(data) / 1e6 : 0} USDT
    </div>
  );
}

export default Balance
