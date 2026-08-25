import React from 'react';
import { Briefcase, Building2, Sparkles, RefreshCw, Compass } from 'lucide-react';

interface NavbarProps {
  activeMode: 'landing' | 'career' | 'msme';
  setActiveMode: (mode: 'landing' | 'career' | 'msme') => void;
  onLoadDemoUser: () => void;
  onLoadDemoBusiness: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  setActiveMode,
  onLoadDemoUser,
  onLoadDemoBusiness,
}) => {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveMode('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold tracking-tight text-white">CareerBridge</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                AI Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Bridge the Gap Between Skills and Opportunities</p>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMode('career')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeMode === 'career'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Build My Career</span>
          </button>

          <button
            onClick={() => setActiveMode('msme')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeMode === 'msme'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Grow My Business</span>
          </button>
        </div>

        {/* Preset Load Buttons */}
        <div className="flex items-center gap-2">
          {activeMode === 'career' && (
            <button
              onClick={onLoadDemoUser}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 border border-blue-500/30 transition"
              title="Load Aarav Sharma (B.Tech CS Student Demo)"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Aarav's Demo</span>
            </button>
          )}

          {activeMode === 'msme' && (
            <button
              onClick={onLoadDemoBusiness}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 transition"
              title="Load Local Clothing Store Demo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Clothing Store Demo</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-1 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>HACKN'TECH 10.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};
