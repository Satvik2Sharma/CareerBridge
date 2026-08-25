import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppShell: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const mode = location.pathname.startsWith('/business') ? 'business' : 'career';

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0">
        <Sidebar mode={mode} />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-64 h-full bg-slate-950 border-r border-slate-800">
            <Sidebar mode={mode} onCloseMobile={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onToggleMobileMenu={() => setMobileOpen(!mobileOpen)}
          isMobileOpen={mobileOpen}
        />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© 2026 CareerBridge — AI-Powered Employability & Opportunity Intelligence Platform</p>
            <p className="font-semibold text-blue-400">HACKN'TECH 10.0 • Theme 8: Future of Work</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
