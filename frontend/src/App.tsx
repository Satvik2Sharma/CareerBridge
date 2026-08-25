import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { CareerDashboard } from './pages/CareerDashboard';
import { MSMEDashboard } from './pages/MSMEDashboard';
import { UserProfile, BusinessProfile } from './types';
import { defaultDemoUser, defaultDemoBusiness } from './services/api';

export const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'landing' | 'career' | 'msme'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultDemoUser);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(defaultDemoBusiness);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        onLoadDemoUser={() => setUserProfile(defaultDemoUser)}
        onLoadDemoBusiness={() => setBusinessProfile(defaultDemoBusiness)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeMode === 'landing' && (
          <LandingPage
            onStartCareer={() => setActiveMode('career')}
            onStartMSME={() => setActiveMode('msme')}
          />
        )}

        {activeMode === 'career' && (
          <CareerDashboard
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}

        {activeMode === 'msme' && (
          <MSMEDashboard
            businessProfile={businessProfile}
            setBusinessProfile={setBusinessProfile}
          />
        )}
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 CareerBridge — AI-Powered Employability & Opportunity Intelligence Platform</p>
          <p className="font-semibold text-blue-400">HACKN'TECH 10.0 • Theme 8: Future of Work</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
