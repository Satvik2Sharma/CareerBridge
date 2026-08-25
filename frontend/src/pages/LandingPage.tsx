import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  Briefcase,
  Building2,
  Sparkles,
  Award,
  Target,
  BookOpen,
  ChevronRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  FileText,
  BarChart3,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stats = [
    { label: 'Verified Job Postings', value: '1,240+', icon: Briefcase, color: 'text-blue-400' },
    { label: 'Government Recruitments', value: '450+', icon: Award, color: 'text-amber-400' },
    { label: 'MSMEs Scored', value: '850+', icon: Building2, color: 'text-emerald-400' },
    { label: 'Match Accuracy Engine', value: '94.8%', icon: Target, color: 'text-cyan-400' }
  ];

  const faqs = [
    {
      q: 'How does CareerBridge evaluate my job match score?',
      a: 'CareerBridge uses a 5-tier deterministic match scoring engine evaluating required skill overlap (35%), proficiency levels (20%), career goal alignment (20%), experience compatibility (15%), and location preferences (10%).'
    },
    {
      q: 'What is the MSME Digital Maturity Assessment?',
      a: 'It is a 6-factor diagnostic framework assessing digital payment readiness, billing automation, inventory tracking systems, online presence, customer communication, and marketing automation for micro & small enterprises.'
    },
    {
      q: 'How does the Government Eligibility Checker work?',
      a: 'It parses official UPSC, SSC, IBPS, and RRB recruitment notification rules, applying reservation category age relaxations (OBC +3 yrs, SC/ST +5 yrs, PWD +10 yrs) and educational degree validation.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <NavLink to="/" className="flex items-center gap-2 text-slate-100 font-bold text-xl">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span>
            Career<span className="text-blue-500">Bridge</span>
          </span>
        </NavLink>

        <div className="flex items-center gap-3">
          <NavLink to="/career/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 hidden sm:block">
            Candidate Portal
          </NavLink>
          <NavLink to="/business/dashboard" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 hidden sm:block">
            MSME Portal
          </NavLink>
          <NavLink to="/career/dashboard">
            <Button variant="primary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
              Launch Platform
            </Button>
          </NavLink>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-20 flex-1">
        {/* Hackathon Header Banner */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 p-3 rounded-2xl border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-lg shadow-blue-500/5">
          <div className="flex items-center gap-2 text-blue-300">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-bold uppercase tracking-wider text-white">HACKN'TECH 10.0 Project</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Theme 8: Future of Work — Employment & Entrepreneurship</span>
          </div>
          <Badge variant="primary">CareerBridge v1.0</Badge>
        </div>

        {/* Hero Title & CTAs */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>AI-Powered Career & Opportunity Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-tight">
            Bridge the Gap Between <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Skills and Opportunities.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CareerBridge intelligently matches job seekers to private & government opportunities with transparent match scoring, while empowering MSMEs with digital maturity scoring and actionable 90-day growth blueprints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <NavLink to="/career/dashboard" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-sm font-bold" leftIcon={<Briefcase className="w-5 h-5" />} rightIcon={<ChevronRight className="w-4 h-4" />}>
                BUILD MY CAREER
              </Button>
            </NavLink>

            <NavLink to="/business/dashboard" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-bold border-emerald-500/40 text-emerald-300" leftIcon={<Building2 className="w-5 h-5 text-emerald-400" />} rightIcon={<ChevronRight className="w-4 h-4 text-emerald-400" />}>
                GROW MY BUSINESS
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card key={idx} className="p-5 text-center space-y-1">
                <Icon className={`w-6 h-6 mx-auto mb-1 ${s.color}`} />
                <h4 className="text-2xl font-extrabold text-slate-100 tracking-tight">{s.value}</h4>
                <p className="text-xs text-slate-400">{s.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Dual Pillar Platform Showcase */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Candidate Intelligence */}
          <Card hoverEffect className="p-8 space-y-6 border-slate-800 hover:border-blue-500/40">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Briefcase className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">PILLAR 1: CANDIDATE PORTAL</span>
              <h2 className="text-2xl font-bold text-slate-100 mt-1">Career & Job Intelligence</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Upload your resume or build your skill profile. Get explainable 5-tier job compatibility match scores, 3-state skill gap analysis, government eligibility evaluations, and personalized learning roadmaps.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Deterministic 5-Weight Match Engine (Skill, Experience, Goal)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>3-State Skill Gap Breakdown (Strong ✓, Partial ◐, Priority Gap ○)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Official UPSC / SSC Government Recruitment & Age Relaxation Checker</span>
              </li>
              <li className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Personalized Learning Roadmap skipping already-mastered skills</span>
              </li>
            </ul>

            <NavLink to="/career/dashboard" className="block pt-2">
              <Button variant="outline" className="w-full text-blue-300 border-blue-500/30" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Launch Candidate Portal
              </Button>
            </NavLink>
          </Card>

          {/* Pillar 2: MSME Growth Intelligence */}
          <Card hoverEffect className="p-8 space-y-6 border-slate-800 hover:border-emerald-500/40">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Building2 className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">PILLAR 2: MSME PORTAL</span>
              <h2 className="text-2xl font-bold text-slate-100 mt-1">MSME Growth Intelligence</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Diagnose your store's digital maturity across 6 key operational dimensions. Receive cost-effective technology tool recommendations and an actionable 90-day growth execution blueprint.
              </p>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>0–100 Digital Maturity Diagnostic Model & Category Breakdown</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Low-Cost Technology Recommendations (POS, Stock, WhatsApp Store)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>90-Day Digital Transformation Growth Blueprint</span>
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Pre-built Templates for Retail, Restaurant, & Kirana Enterprises</span>
              </li>
            </ul>

            <NavLink to="/business/dashboard" className="block pt-2">
              <Button variant="outline" className="w-full text-emerald-300 border-emerald-500/30" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Launch MSME Portal
              </Button>
            </NavLink>
          </Card>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <Badge variant="primary">Frequently Asked Questions</Badge>
            <h2 className="text-2xl font-bold text-slate-100">Everything You Need to Know</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                interactive
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="p-5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-400" /> {faq.q}
                  </h4>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 CareerBridge — AI-Powered Employability & Opportunity Intelligence Platform</p>
          <p className="font-semibold text-blue-400">HACKN'TECH 10.0 • Theme 8: Future of Work</p>
        </div>
      </footer>
    </div>
  );
};
