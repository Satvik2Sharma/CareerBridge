import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Briefcase,
  User,
  FileText,
  Compass,
  Award,
  Layers,
  CheckSquare,
  Building2,
  TrendingUp,
  BarChart3,
  Sparkles,
  Zap,
  ChevronRight
} from 'lucide-react';
import { env } from '../../config/env';

interface SidebarProps {
  mode: 'career' | 'business';
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mode, onCloseMobile }) => {
  const careerNav = [
    { label: 'Overview', to: '/career/dashboard', icon: Zap },
    { label: 'My Profile', to: '/career/profile', icon: User },
    { label: 'Resume Analysis', to: '/career/resume', icon: FileText },
    { label: 'Job Search', to: '/career/jobs', icon: Briefcase },
    { label: 'Government Opportunities', to: '/career/government-jobs', icon: Award },
    { label: 'Career Explorer', to: '/career/careers', icon: Compass },
    { label: 'Skill Gap Breakdown', to: '/career/skill-gap', icon: Layers },
    { label: 'Learning Roadmap', to: '/career/roadmap', icon: TrendingUp },
    { label: 'Skill Assessments', to: '/career/assessments', icon: CheckSquare }
  ];

  const businessNav = [
    { label: 'Business Overview', to: '/business/dashboard', icon: Building2 },
    { label: 'Business Profile', to: '/business/profile', icon: User },
    { label: 'Digital Maturity Assessment', to: '/business/assessment', icon: BarChart3 },
    { label: 'Recommendations Catalog', to: '/business/recommendations', icon: Sparkles },
    { label: '90-Day Growth Roadmap', to: '/business/roadmap', icon: TrendingUp }
  ];

  const currentNav = mode === 'career' ? careerNav : businessNav;

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between h-full select-none">
      <div>
        {/* Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-slate-100 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span>Career<span className="text-blue-500">Bridge</span></span>
          </NavLink>
        </div>

        {/* Workspace Switcher */}
        <div className="p-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 flex gap-1 text-xs">
            <NavLink
              to="/career/dashboard"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-all ${
                  mode === 'career' || isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <User className="w-3.5 h-3.5" />
              Career
            </NavLink>
            <NavLink
              to="/business/dashboard"
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md font-medium transition-all ${
                  mode === 'business' || isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Building2 className="w-3.5 h-3.5" />
              Business
            </NavLink>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            {mode === 'career' ? 'Career Intelligence' : 'MSME Intelligence'}
          </p>
          {currentNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 opacity-40" />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-800/80 text-slate-400 text-[11px]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-blue-400">Mode</span>
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded text-[10px]">
            {env.USE_MOCK_API ? 'Offline Mock' : 'Live API (v1)'}
          </span>
        </div>
        <p className="truncate text-slate-400">{env.HACKATHON_TAG}</p>
      </div>
    </aside>
  );
};
