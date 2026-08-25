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
import { GoogleAuthButton } from '../components/GoogleAuthButton';

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

          <GoogleAuthButton />

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

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            CareerBridge is an AI-powered SaaS engine for candidates seeking verified career roadmaps, job match scoring, and government opportunity eligibility — and for MSMEs scaling digital operations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <NavLink to="/career/dashboard">
              <Button variant="primary" size="lg" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Candidate Intelligence
              </Button>
            </NavLink>

            <NavLink to="/business/dashboard">
              <Button variant="outline" size="lg" leftIcon={<Building2 className="w-4 h-4 text-emerald-400" />}>
                MSME Digital Diagnostics
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((st) => {
            const Icon = st.icon;
            return (
              <Card key={st.label} className="p-5 text-center space-y-2 hover:border-slate-700 transition-all">
                <Icon className={`w-6 h-6 mx-auto ${st.color}`} />
                <h4 className="text-2xl font-black text-slate-100">{st.value}</h4>
                <p className="text-xs text-slate-400 font-medium">{st.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Key Features Section */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-100">Dual-Intelligence Platform Architecture</h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Empowering both job-seeking candidates and small enterprises with actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Candidate Portal Card */}
            <Card className="p-8 space-y-6 border-blue-900/40 bg-gradient-to-b from-blue-950/20 to-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">Candidate Employability Portal</h3>
                  <p className="text-xs text-slate-400">Skill verification, matching, & career growth</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>AI Resume Extractor:</strong> Automatic skill, experience, & education parsing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>5-Factor Job Match Score:</strong> Transparent breakdown of required vs matched skills.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Government Eligibility Checker:</strong> Age relaxation rules for UPSC, SSC, IBPS, RRB.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Personalized 90-Day Roadmap:</strong> Weekly skill build milestones and practical tasks.</span>
                </li>
              </ul>

              <NavLink to="/career/dashboard" className="block pt-2">
                <Button variant="primary" size="sm" className="w-full" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Explore Candidate Tools
                </Button>
              </NavLink>
            </Card>

            {/* MSME Portal Card */}
            <Card className="p-8 space-y-6 border-emerald-900/40 bg-gradient-to-b from-emerald-950/20 to-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">MSME Digital Growth Portal</h3>
                  <p className="text-xs text-slate-400">Digital maturity scoring & tech transformation</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>0–100 Digital Maturity Diagnostic:</strong> Evaluate tech readiness across 6 operational areas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Low-Cost Tech Recommendations:</strong> Tailored tools for inventory, payments, & marketing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>30-60-90 Day Transformation Blueprint:</strong> Practical step-by-step business modernization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Local Talent Sourcing:</strong> Direct connection to skilled candidates in your area.</span>
                </li>
              </ul>

              <NavLink to="/business/dashboard" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full text-emerald-400 border-emerald-800 hover:bg-emerald-950/40" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Explore MSME Tools
                </Button>
              </NavLink>
            </Card>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-100">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-400">Everything you need to know about the CareerBridge platform.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden text-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-300 font-semibold">
          <Zap className="w-4 h-4 text-blue-500 fill-current" />
          <span>CareerBridge AI Platform</span>
        </div>
        <p>Built for HACKN'TECH 10.0 • COER University Hackathon 2026 • Theme: Future of Work</p>
      </footer>
    </div>
  );
};
