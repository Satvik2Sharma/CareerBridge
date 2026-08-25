import React from 'react';
import { Compass, Briefcase, Building2, Sparkles, Award, Target, BookOpen, ChevronRight, Zap } from 'lucide-react';

interface LandingPageProps {
  onStartCareer: () => void;
  onStartMSME: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartCareer, onStartMSME }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hackathon Theme Banner */}
      <div className="max-w-4xl mx-auto glass-panel p-3 rounded-2xl border border-blue-500/30 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-blue-300">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span className="font-bold uppercase tracking-wider text-white">HACKN'TECH 10.0 Submission</span>
          <span>•</span>
          <span>Theme 8: Future of Work — Technology for Employment & Entrepreneurship</span>
        </div>
        <span className="text-[10px] uppercase font-extrabold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
          CareerBridge Engine
        </span>
      </div>

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>AI-Powered Employability & Business Opportunity Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
          Bridge the Gap Between <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            Skills and Opportunities.
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          CareerBridge intelligently answers what jobs you fit, what skills you are missing, and how to become opportunity-ready — while empowering MSMEs to measure digital maturity and adopt growth technologies.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartCareer}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition"
          >
            <Briefcase className="w-5 h-5" />
            <span>Build My Career</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStartMSME}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-sm rounded-2xl border border-emerald-500/40 shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition"
          >
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span>Grow My Business</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Feature Split Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* For Individuals */}
        <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6 relative overflow-hidden group hover:border-blue-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Briefcase className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">FOR INDIVIDUALS</span>
            <h2 className="text-2xl font-bold font-heading text-white mt-1">Career & Job Intelligence</h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Upload your resume or build your skill profile. Get explainable 5-tier job compatibility match scores, 3-state skill gap analysis, and personalized learning roadmaps.
            </p>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <li className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" /> Deterministic 5-Match Scoring Engine (No random LLM guessing)
            </li>
            <li className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" /> 3-State Skill Gap Analysis (Strong ✓, Partial ~, Missing ✗)
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" /> Personalized Roadmap (Skips skills you already master)
            </li>
            <li className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" /> Interactive Skill Quizzes & Readiness Score Tracker
            </li>
          </ul>

          <button
            onClick={onStartCareer}
            className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs rounded-xl border border-blue-500/30 flex items-center justify-center gap-1 transition"
          >
            Explore Career Intelligence <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* For MSMEs */}
        <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6 relative overflow-hidden group hover:border-emerald-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">FOR MSMES & SMALL BUSINESSES</span>
            <h2 className="text-2xl font-bold font-heading text-white mt-1">MSME Growth Intelligence</h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Evaluate your business's digital maturity across 6 key operational dimensions. Receive technology tool recommendations and a practical 90-day growth roadmap.
            </p>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <li className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> 0-100 Digital Maturity Model & Category Breakdown
            </li>
            <li className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" /> Tailored Tech Recommendations (Payments, Stock, Online)
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" /> 90-Day Digital Execution Growth Roadmap
            </li>
            <li className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Pre-built Local Business Templates (Store, Cafe, Kirana)
            </li>
          </ul>

          <button
            onClick={onStartMSME}
            className="w-full py-3 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-xs rounded-xl border border-emerald-500/30 flex items-center justify-center gap-1 transition"
          >
            Explore MSME Intelligence <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
