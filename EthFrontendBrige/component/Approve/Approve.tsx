import React from "react";
import { useConnection, useWriteContract } from "wagmi";

const Approve = () => {
  const writeContract = useWriteContract();
  const { address, isConnected } = useConnection();
  async function submit(e: React.ChangeEvent) {
    e.preventDefault();
    if(!address) return
    writeContract.mutate({
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      abi: [
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      functionName : "approve",
      args : [address, BigInt(1)],
    });
  }
  return (
    <form onSubmit={submit}>
      <input type="text" name="" id="" />
      <button type="submit">Approve</button>
    </form>
  );
};

export default Approve;
