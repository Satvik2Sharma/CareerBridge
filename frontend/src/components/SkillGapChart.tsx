import React from 'react';
import { SkillGapAnalysis } from '../types';
import { CheckCircle2, AlertCircle, HelpCircle, Clock, Zap } from 'lucide-react';

interface SkillGapChartProps {
  analysis: SkillGapAnalysis | null;
  onStartAssessment: (skill: string) => void;
}

export const SkillGapChart: React.FC<SkillGapChartProps> = ({ analysis, onStartAssessment }) => {
  if (!analysis) {
    return (
      <div className="bg-slate-900/60 rounded-2xl p-6 text-center text-slate-400 border border-slate-800">
        Select a job recommendation to view its detailed skill gap analysis.
      </div>
    );
  }

  const { target_title, strong_skills, matched_skills, partial_skills, priority_missing_skills } = analysis;

  return (
    <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Skill Gap Analysis</span>
          <h2 className="text-xl font-bold text-white tracking-tight">{target_title}</h2>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Strong (✓)
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <HelpCircle className="w-3.5 h-3.5" /> Partial (◐)
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> Missing (○)
          </span>
        </div>
      </div>

      {/* 3-State Skill Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Strong & Matched */}
        {[...strong_skills, ...matched_skills].map((skill) => (
          <div key={skill} className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-300">
                  ✓ {skill}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                  STRONG
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Partial */}
        {partial_skills.map((skill) => (
          <div key={skill} className="p-4 rounded-xl border bg-amber-500/10 border-amber-500/30 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-amber-300">
                  ◐ {skill}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  PARTIAL
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/60 mt-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Clock className="w-3 h-3" /> ~4 hrs
              </span>
              <button
                onClick={() => onStartAssessment(skill)}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] rounded-lg shadow flex items-center gap-1"
              >
                <Zap className="w-3 h-3" /> Practice Quiz
              </button>
            </div>
          </div>
        ))}

        {/* Missing */}
        {priority_missing_skills.map((skill) => (
          <div key={skill} className="p-4 rounded-xl border bg-rose-500/10 border-rose-500/30 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-rose-300">
                  ○ {skill}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                  PRIORITY GAP
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-800/60 mt-2 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <Clock className="w-3 h-3" /> ~10 hrs
              </span>
              <button
                onClick={() => onStartAssessment(skill)}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] rounded-lg shadow flex items-center gap-1"
              >
                <Zap className="w-3 h-3" /> Practice Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
