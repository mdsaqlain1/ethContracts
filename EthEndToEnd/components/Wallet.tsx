import React, { useState } from "react";
import { useConnect, useAccount, useConnectors, useDisconnect } from "wagmi";
import { Link } from "react-router-dom";

const WalletHeader = () => {
  const connectors = useConnectors();
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // State handles for mobile menus
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Helper to ensure open layout states reset on navigation
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsWalletModalOpen(false);
  };

  return (
    <>
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LEFT: Branding & Desktop Nav */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-sm shadow-indigo-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              
              {/* FIXED LINK: High z-index explicitly set and menu reset capability included */}
              <Link 
                to="/" 
                onClick={closeAllMenus}
                className="relative z-50 text-lg font-bold text-slate-900 tracking-tight hover:opacity-90 transition-opacity"
              >
                Stake<span className="text-indigo-600">Rewards</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link to="/stake" className="block text-indigo-600 font-semibold">
                Dashboard
              </Link>
              <a
                href="#analytics"
                className="hover:text-slate-900 transition-colors"
              >
                Analytics
              </a>
            </nav>
          </div>

          {/* RIGHT: Action Elements */}
          <div className="flex items-center gap-2">
            {/* Wallet Integration Wrapper */}
            <div className="flex items-center">
              {isConnected && address ? (
                /* --- CONNECTED STATE (Responsive layout) --- */
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1 pl-3 rounded-full shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-700">
                      {`${address.slice(0, 4)}...${address.slice(-4)}`}
                    </span>
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white bg-white hover:bg-rose-600 border border-slate-200 hover:border-rose-600 rounded-full transition-all cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                /* --- DISCONNECTED STATE --- */
                <>
                  {/* Desktop Quick Connect */}
                  <div className="hidden sm:flex items-center gap-2">
                    {connectors.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => connect({ connector: wallet })}
                        className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-indigo-600 hover:text-white border border-slate-200 rounded-xl transition-all cursor-pointer"
                      >
                        {wallet.name}
                      </button>
                    ))}
                  </div>

                  {/* Mobile Trigger Button */}
                  <button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="sm:hidden px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Connect Wallet
                  </button>
                </>
              )}
            </div>

            {/* Hamburger Toggle (Visible on Mobile only for nav links) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBILE DROPDOWN MENU --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white border-b border-slate-200 px-4 py-3 flex flex-col gap-2 z-30 sticky top-[65px]">
          <Link
            to="/stake"
            onClick={closeAllMenus}
            className="block px-3 py-2 text-base font-medium text-indigo-600 bg-indigo-50 rounded-xl"
          >
            Dashboard
          </Link>
          <a
            href="#analytics"
            onClick={closeAllMenus}
            className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
          >
            Analytics
          </a>
        </div>
      )}

      {/* --- MOBILE/DESKTOP WALLET SELECTION MODAL --- */}
      {isWalletModalOpen && !isConnected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm">
          {/* Modal Backdrop Click-away */}
          <div
            className="absolute inset-0"
            onClick={() => setIsWalletModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">
                Connect a Wallet
              </h3>
              <button
                onClick={() => setIsWalletModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {connectors.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => {
                    connect({ connector: wallet });
                    setIsWalletModalOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-3.5 bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-slate-700 font-semibold text-sm transition-all text-left cursor-pointer"
                >
                  <span>{wallet.name}</span>
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletHeader;