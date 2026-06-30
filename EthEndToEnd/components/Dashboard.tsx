import React, { useState, useEffect } from 'react';
import { stakingABI } from '../ABI/StakingContract.ts';
import { 
  useAccount, 
  useReadContract, 
  useWriteContract, 
  useBalance, 
  useWaitForTransactionReceipt 
} from 'wagmi';
import { formatEther, parseEther } from 'viem';

const Dashboard = () => {
  // UI State
  const [activeTab, setActiveTab] = useState('stake');
  
  // Contract State
  const [stakeAmount, setStakeAmount] = useState('');
  const [unStakeAmount, setUnStakeAmount] = useState('');

  const { address, isConnected } = useAccount();

  // Fetch Wallet Balance
  const { data: walletBalance, refetch: refetchWallet } = useBalance({ address });

  // Contract Writers (Extracted transaction hashes)
  const { data: stakeHash, writeContract, isPending: isWritePending } = useWriteContract({});
  const { data: unstakeHash, writeContract: writeUnStake, isPending: isUnStakePending } = useWriteContract({});
  const { data: claimHash, writeContract: writeClaimReward, isPending: isClaimRewardPending } = useWriteContract({});

  const readQuery = address ? { enabled: true } : undefined;

  // Contract Readers (Extracted refetch functions)
  const { data: userData, error, isPending: isDataPending, refetch: refetchUserData } = useReadContract({
    abi: stakingABI,
    address: '0xB48904C498d87B7c34D02a4A4b6E71E1f983a2c1',
    functionName: 'data',
    args: address ? [address] : undefined,
    ...(readQuery ? { query: readQuery } : {}),
  });

  const { data: reward, error: rewardError, isPending: isRewardLoading, refetch: refetchReward } = useReadContract({
    abi: stakingABI,
    address: '0xB48904C498d87B7c34D02a4A4b6E71E1f983a2c1',
    functionName: 'getReward',
    args: address ? [address] : undefined,
    ...(readQuery ? { query: readQuery } : {}),
  });

  const rewardData = reward as bigint | undefined;
  const [balance, lastUpdated, unclaimedReward] = (userData as [bigint, bigint, bigint]) || [0n, 0n, 0n];

  // Helper to refresh all data at once
  const refetchAll = () => {
    refetchWallet();
    refetchUserData();
    refetchReward();
  };

  // Wait for transactions to be mined
  const { isLoading: isStakeMining, isSuccess: isStakeConfirmed } = useWaitForTransactionReceipt({ hash: stakeHash });
  const { isLoading: isUnstakeMining, isSuccess: isUnstakeConfirmed } = useWaitForTransactionReceipt({ hash: unstakeHash });
  const { isLoading: isClaimMining, isSuccess: isClaimConfirmed } = useWaitForTransactionReceipt({ hash: claimHash });

  // Trigger refetches and clear inputs when confirmed
  useEffect(() => {
    if (isStakeConfirmed) {
      refetchAll();
      setStakeAmount(''); 
    }
  }, [isStakeConfirmed]);

  useEffect(() => {
    if (isUnstakeConfirmed) {
      refetchAll();
      setUnStakeAmount(''); 
    }
  }, [isUnstakeConfirmed]);

  useEffect(() => {
    if (isClaimConfirmed) {
      refetchAll();
    }
  }, [isClaimConfirmed]);

  if (!isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Wallet Disconnected</h2>
          <p className="text-slate-500">Please connect your wallet to access the Staking Terminal.</p>
        </div>
      </div>
    );
  }

  if (isDataPending || isRewardLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-semibold animate-pulse text-indigo-600 tracking-wide">Loading Terminal Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm">
          <p className="font-semibold text-red-700">Error fetching data:</p>
          <p className="text-sm mt-1 text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. USER BALANCE CARDS */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Card: Total Staked */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Staked</p>
            <div className="mt-2 flex items-baseline gap-2 min-w-0">
              <span className="text-3xl font-bold tracking-tight text-slate-900 truncate" title={Number(formatEther(balance)).toString()}>
                {Number(formatEther(balance)).toFixed(4)}
              </span>
              <span className="text-sm font-semibold text-slate-500 shrink-0">sETH</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Active in contract</p>
          </div>

          {/* Card: Available Balance */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Balance</p>
            <div className="mt-2 flex items-baseline gap-2 min-w-0">
              <span className="text-3xl font-bold tracking-tight text-slate-900 truncate" title={walletBalance ? formatEther(walletBalance.value) : '0'}>
                {walletBalance ? Number(formatEther(walletBalance.value)).toFixed(4) : '0.00'}
              </span>
              <span className="text-sm font-semibold text-slate-500 shrink-0">sETH</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Liquid in wallet</p>
          </div>

          {/* Card: Claimable Rewards */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Claimable Rewards</p>
              <div className="mt-2 flex items-baseline gap-2 min-w-0">
                <span 
                  className="text-3xl font-bold tracking-tight text-indigo-600 truncate"
                  title={rewardData !== undefined ? formatEther(rewardData) : '0'} 
                >
                  {rewardData !== undefined ? formatEther(rewardData) : '0.00'}
                </span>
                <span className="text-sm font-semibold text-indigo-500 shrink-0">SAQ</span>
              </div>
            </div>
            <button 
              disabled={isClaimRewardPending || isClaimMining || rewardData === 0n}
              onClick={() => {
                if (!address) return;
                writeClaimReward({
                  abi: stakingABI,
                  address: '0xB48904C498d87B7c34D02a4A4b6E71E1f983a2c1',
                  functionName: 'claimReward',
                });
              }}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isClaimRewardPending ? 'Confirm in Wallet...' : isClaimMining ? 'Mining...' : 'Claim Rewards'}
            </button>
          </div>
        </section>

        {/* BOTTOM LAYOUT - CENTERED TERMINAL */}
        <div className="flex justify-center">
          
          {/* 2. STAKING ACTION INTERFACE (THE TERMINAL) */}
          <section className="w-full max-w-2xl rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col">
            {/* Tab Toggles */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-2">
              <button 
                onClick={() => setActiveTab('stake')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'stake' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Stake Tokens
              </button>
              <button 
                onClick={() => setActiveTab('unstake')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${activeTab === 'unstake' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Unstake Tokens
              </button>
            </div>

            {/* Tab Panel Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              {activeTab === 'stake' ? (
                /* STAKE INTERFACE */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Amount to Stake</label>
                    <div className="relative rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                      <input 
                        type="number" 
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="0.0" 
                        className="w-full border-none p-0 text-xl font-bold bg-transparent text-slate-900 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">ETH</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-3.5 flex gap-3">
                    <svg className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v4.5m0-9h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>
                      <h4 className="text-xs font-bold text-blue-800">Staking Notice</h4>
                      <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">Staking tokens will lock them in the smart contract to begin earning rewards. Standard gas fees apply.</p>
                    </div>
                </div>
                  
                  
                  
                  <div className="pt-4">
                    <button 
                      disabled={isWritePending || isStakeMining || !stakeAmount}
                      onClick={() => {
                        if (!address || !stakeAmount) return;
                        writeContract({
                          abi: stakingABI,
                          address: '0xB48904C498d87B7c34D02a4A4b6E71E1f983a2c1',
                          functionName: 'stake',
                          value: parseEther(stakeAmount),
                        });
                      }}
                      className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isWritePending ? 'Confirm in Wallet...' : isStakeMining ? 'Mining...' : 'Deposit & Stake'}
                    </button>
                  </div>
                </div>
              ) : (
                /* UNSTAKE INTERFACE */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Amount to Unstake</label>
                    <div className="relative rounded-xl border border-slate-200 px-4 py-3 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                      <input 
                        type="number" 
                        value={unStakeAmount}
                        onChange={(e) => setUnStakeAmount(e.target.value)}
                        placeholder="0.0" 
                        className="w-full border-none p-0 text-xl font-bold bg-transparent text-slate-900 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">ETH</span>
                    </div>
                  </div>

                  {/* Warning banner */}
                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-3.5 flex gap-3">
                    <svg className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h4 className="text-xs font-bold text-amber-800">Unstaking Notice</h4>
                      <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">Ensure you have sufficient staked balance before initiating a withdrawal. Gas fees apply.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      disabled={isUnStakePending || isUnstakeMining || !unStakeAmount}
                      onClick={() => {
                        if (!address || !unStakeAmount) return;
                        writeUnStake({
                          abi: stakingABI,
                          address: '0xB48904C498d87B7c34D02a4A4b6E71E1f983a2c1',
                          functionName: 'unstake',
                          args: [parseEther(unStakeAmount)],
                        });
                      }}
                      className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUnStakePending ? 'Confirm in Wallet...' : isUnstakeMining ? 'Mining...' : 'Withdraw Tokens'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;