import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Briefcase, Building2, Sparkles, Award, Target, BookOpen, ChevronRight, Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-slate-100 font-bold text-xl">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span>Career<span className="text-blue-500">Bridge</span></span>
        </NavLink>

        <div className="flex items-center gap-3">
          <NavLink to="/career/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2">
            Candidate Portal
          </NavLink>
          <NavLink to="/business/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2">
            MSME Portal
          </NavLink>
          <NavLink
            to="/career/dashboard"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all"
          >
            Launch Platform
          </NavLink>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-16 flex-1">
        {/* Hackathon Theme Banner */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 p-3 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-300">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-bold uppercase tracking-wider text-white">HACKN'TECH 10.0 Submission</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Theme 8: Future of Work — Technology for Employment & Entrepreneurship</span>
          </div>
          <span className="text-[10px] uppercase font-extrabold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded border border-blue-500/30">
            CareerBridge SaaS
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>AI-Powered Employability & Opportunity Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-tight">
            Bridge the Gap Between <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Skills and Opportunities.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CareerBridge intelligently answers what jobs you fit, what skills you are missing, and how to become opportunity-ready — while empowering MSMEs to measure digital maturity and adopt growth technologies.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <NavLink
              to="/career/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Briefcase className="w-5 h-5" />
              <span>BUILD MY CAREER</span>
              <ChevronRight className="w-4 h-4" />
            </NavLink>

            <NavLink
              to="/business/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-sm rounded-xl border border-emerald-500/40 shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>GROW MY BUSINESS</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </NavLink>
          </div>
        </div>

        {/* Feature Split Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Individuals */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 space-y-6 relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Briefcase className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">FOR CANDIDATES</span>
              <h2 className="text-2xl font-bold text-slate-100 mt-1">Career & Job Intelligence</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Upload your resume or build your skill profile. Get explainable 5-tier job compatibility match scores, 3-state skill gap analysis, and personalized learning roadmaps.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" /> Deterministic 5-Match Scoring Engine
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" /> 3-State Skill Gap Analysis (Strong ✓, Partial ◐, Missing ○)
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" /> Personalized Roadmap (Skips mastered skills)
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" /> Government Recruitment & Eligibility Evaluator
              </li>
            </ul>

            <NavLink
              to="/career/dashboard"
              className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs rounded-xl border border-blue-500/30 flex items-center justify-center gap-1 transition-all"
            >
              Explore Candidate Portal <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          {/* For MSMEs */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 space-y-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Building2 className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">FOR MSMES & SMALL BUSINESSES</span>
              <h2 className="text-2xl font-bold text-slate-100 mt-1">MSME Growth Intelligence</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Evaluate your business's digital maturity across 6 key operational dimensions. Receive technology tool recommendations and a practical 90-day growth roadmap.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> 0-100 Digital Maturity Model & Category Radar
              </li>
              <li className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" /> Low-Cost Tech Recommendations (POS, Stock, Online)
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" /> 90-Day Digital Execution Growth Roadmap
              </li>
            </ul>

            <NavLink
              to="/business/dashboard"
              className="w-full py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs rounded-xl border border-emerald-500/30 flex items-center justify-center gap-1 transition-all"
            >
              Explore MSME Portal <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 CareerBridge — AI-Powered Employability & Opportunity Intelligence Platform</p>
          <p className="font-semibold text-blue-400">HACKN'TECH 10.0 • Theme 8: Future of Work</p>
        </div>
      </footer>
    </div>
  );
};
