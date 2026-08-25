import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Zap, Bell, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { GoogleAuthButton } from '../GoogleAuthButton';

interface TopbarProps {
  onToggleMobileMenu: () => void;
  isMobileOpen: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileMenu, isMobileOpen }) => {
  return (
    <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="relative hidden sm:block w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills, careers, jobs..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-blue-500 rounded-full absolute top-1.5 right-1.5" />
        </button>

        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        {/* Google OAuth JWT Authentication Button */}
        <GoogleAuthButton />

        <NavLink to="/">
          <Button variant="outline" size="sm">
            Landing
          </Button>
        </NavLink>
      </div>
    </header>
  );
};
