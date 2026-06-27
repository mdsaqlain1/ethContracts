import React, { useState } from 'react';

const Dashboard = () => {
  // State to manage active tab in the Staking Terminal
  const [activeTab, setActiveTab] = useState('stake');
  // State to manage selected lock-up pool
  const [selectedPool, setSelectedPool] = useState('flexible');

  // Dummy pool data
  const pools = [
    { id: 'flexible', name: 'Flexible Pool', apy: '4.5%', duration: 'No Lock-up' },
    { id: '30day', name: '30-Day Lock', apy: '7.2%', duration: '30 Days' },
    { id: '180day', name: '180-Day Lock', apy: '12.8%', duration: '180 Days' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. USER BALANCE CARDS */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Card: Total Staked */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Staked</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">12,450.00</span>
              <span className="text-sm font-semibold text-slate-500">ETH</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">≈ $24,900.00 USD</p>
          </div>

          {/* Card: Available Balance */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Balance</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-slate-900">3,125.50</span>
              <span className="text-sm font-semibold text-slate-500">STRK</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Liquid in wallet</p>
          </div>

          {/* Card: Claimable Rewards */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Claimable Rewards</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-indigo-600 animate-pulse">142.85</span>
                <span className="text-sm font-semibold text-indigo-500">STRK</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Claim Rewards
            </button>
          </div>
        </section>

        {/* BOTTOM LAYOUT GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          
          {/* 2. STAKING ACTION INTERFACE (THE TERMINAL) */}
          <section className="lg:col-span-3 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col">
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
                        placeholder="0.0" 
                        className="w-full border-none p-0 text-xl font-bold bg-transparent text-slate-900 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">STRK</span>
                    </div>
                  </div>

                  {/* Percentage Fast Selection */}
                  <div className="grid grid-cols-4 gap-2">
                    {['25%', '50%', '75%', 'Max'].map((pct) => (
                      <button key={pct} className="rounded-lg bg-slate-50 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                        {pct}
                      </button>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <button className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all">
                      Deposit & Stake
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
                        placeholder="0.0" 
                        className="w-full border-none p-0 text-xl font-bold bg-transparent text-slate-900 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">STRK</span>
                    </div>
                  </div>

                  {/* Penalty / Unbonding warning banner */}
                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-3.5 flex gap-3">
                    <svg className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h4 className="text-xs font-bold text-amber-800">Unbonding Period Applies</h4>
                      <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">Tokens will take 7 days to process before becoming liquid back into your active wallet balance.</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all">
                      Withdraw Tokens
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 3. LOCK-UP / STAKING TIERS GRID */}
          <section className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Staking Tiers</h3>
              <p className="text-xs text-slate-500 mt-1">Select a lock-up period tier to amplify your compounding APY yield.</p>
              
              <div className="mt-5 space-y-3">
                {pools.map((pool) => (
                  <div 
                    key={pool.id}
                    onClick={() => setSelectedPool(pool.id)}
                    className={`cursor-pointer rounded-xl border p-4 flex items-center justify-between transition-all ${selectedPool === pool.id ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center transition-all ${selectedPool === pool.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                        {selectedPool === pool.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{pool.name}</p>
                        <p className="text-xs text-slate-500">{pool.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-extrabold text-indigo-600">{pool.apy}</p>
                      <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Est. APY</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tier context notice */}
            <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Selected Multiplier:</span>
              <span className="font-bold text-indigo-600">
                {selectedPool === 'flexible' ? '1.0x' : selectedPool === '30day' ? '1.6x' : '2.8x'}
              </span>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;