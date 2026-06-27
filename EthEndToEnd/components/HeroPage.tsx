import { useState } from "react";

const HeroPage = () => {
  const REWARD_PER_ETH_PER_SEC = 115740;
  const SECONDS_IN_DAY = 86400;
  const SECONDS_IN_MONTH = 86400 * 30;
  const SECONDS_IN_YEAR = 86400 * 365;

  const [stakeAmount, setStakeAmount] = useState(10);
  const calculateReward = (seconds) => {
    const reward = (seconds * stakeAmount * REWARD_PER_ETH_PER_SEC) / 1000000;
    return reward.toFixed(4);
  };
  return (
    <div>
      <header className="relative pt-14 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
            Smart Pool Live
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
            Stake your $ETH, secure the network, and earn rewards every single
            second{" "}
          </h1>
          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Maximize your crypto assets with non-custodial decentralized pooling
            layers. Secure, audit-backed rewards every second.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#calculator"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold rounded-xl shadow-sm transition-all"
            >
              Try Earnings Calculator
            </a>
          </div>
        </div>
      </header>

      {/* Live Metrics Ticker */}
      {/* <section className="border-y border-slate-200 bg-white py-6 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="pt-4 sm:pt-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Total Value Locked (TVL)</p>
            <p className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">1,482.95 ETH</p>
          </div>
          <div className="pt-4 sm:pt-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Current Base APY</p>
            <p className="text-2xl sm:text-3xl font-black tracking-tight text-indigo-600">14.22%</p>
          </div>
          <div className="pt-4 sm:pt-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Total Rewards Distributed</p>
            <p className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">42,901,510 SAQ</p>
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Absolute simplicity at every checkpoint of your staking journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-all group">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Connect Wallet
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Link any supported Web3 interface wallet seamlessly without
              registering external personal credentials.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-all group">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Deposit Tokens
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Designate your commitment assets directly to the smart contract
              via our gas-optimized internal logic layers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-all group">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Collect Rewards
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Track multi-token accumulation dynamics second by second. Withdraw
              or restake yields seamlessly instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Staking Calculator Section */}
      <section id="calculator" className="pb-12 px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 relative">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Interactive Value Builder
            </h2>
            <p className="text-slate-500 text-sm">
              Simulate immediate performance payouts based on your target
              investment volume.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-slate-600">
                  Amount to Stake
                </label>
                <span className="text-2xl font-mono font-bold text-indigo-600">
                  {stakeAmount} ETH
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="100"
                step="0.1"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 font-mono mt-2">
                <span>0.1 ETH</span>
                <span>50 ETH</span>
                <span>100 ETH</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Daily Earnings
                </p>
                <p className="text-xl font-bold font-mono text-slate-800">
                  +{calculateReward(SECONDS_IN_DAY)}{" "}
                  <span className="text-xs font-sans text-slate-500 font-medium">
                    SAQ
                  </span>
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Monthly Earnings
                </p>
                <p className="text-xl font-bold font-mono text-slate-800">
                  +{calculateReward(SECONDS_IN_MONTH)}{" "}
                  <span className="text-xs font-sans text-slate-500 font-medium">
                    SAQ
                  </span>
                </p>
              </div>
              <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-xl text-center">
                <p className="text-xs text-indigo-600 uppercase tracking-wider font-semibold mb-1">
                  Yearly Earnings (14%)
                </p>
                <p className="text-xl font-bold font-mono text-indigo-600">
                  +{calculateReward(SECONDS_IN_YEAR)}{" "}
                  <span className="text-xs font-sans text-indigo-500 font-medium">
                    SAQ
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white py-8 text-center text-xs text-slate-400">
        <p>© 2026 StakeRewards Protocol. Verified open-source architecture.</p>
      </footer>
    </div>
  );
};

export default HeroPage;
