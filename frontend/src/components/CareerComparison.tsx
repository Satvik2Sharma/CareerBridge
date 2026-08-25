import React from 'react';
import { CareerRecommendation } from '../types';
import { Compass, CheckCircle, AlertCircle, ArrowRight, Clock } from 'lucide-react';

interface CareerComparisonProps {
  careers: CareerRecommendation[];
  onSelectCareerGoal: (title: string, gaps: string[]) => void;
}

export const CareerComparison: React.FC<CareerComparisonProps> = ({ careers, onSelectCareerGoal }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div>
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">AI Career Taxonomy</span>
        <h2 className="text-xl font-bold text-white tracking-tight">Top Recommended Career Paths</h2>
        <p className="text-xs text-slate-400 mt-1">
          Career recommendation answers: <span className="text-blue-300 font-semibold">"Which career paths fit my overall profile long-term?"</span>
        </p>
      </div>

      <div className="space-y-4">
        {careers.map((item) => (
          <div
            key={item.career_id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-white font-heading">{item.match_score}%</span>
                  <span className="block text-[10px] text-slate-400 font-medium uppercase">Fit Score</span>
                </div>
                <button
                  onClick={() => onSelectCareerGoal(item.title, item.gaps)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-1 transition"
                >
                  Build Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Match Percentage Progress Bar */}
            <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${item.match_score}%` }}
              />
            </div>

            {/* Natural Language Explanation */}
            {item.explanation && (
              <p className="mt-3 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 italic">
                "{item.explanation}"
              </p>
            )}

            {/* Strengths, Gaps & Effort */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-3 border-t border-slate-800/60">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Current Strengths</span>
                <div className="flex flex-wrap gap-1">
                  {item.strengths.slice(0, 4).map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded text-[11px]">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Key Skill Gaps</span>
                <div className="flex flex-wrap gap-1">
                  {item.gaps.slice(0, 3).map((g) => (
                    <span key={g} className="px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded text-[11px]">
                      ⚠ {g}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Estimated Preparation</span>
                <span className="flex items-center gap-1 font-semibold text-slate-200">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  {item.prep_effort_months}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
