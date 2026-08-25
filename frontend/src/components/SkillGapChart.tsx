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
      <div className="glass-card rounded-2xl p-6 text-center text-slate-400">
        Select a job recommendation to view its detailed skill gap analysis.
      </div>
    );
  }

  const { job_title, all_skill_states, prioritized_gaps } = analysis;

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Skill Gap Analysis</span>
          <h2 className="text-xl font-bold text-white tracking-tight">{job_title}</h2>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Strong (✓)
          </span>
          <span className="flex items-center gap-1 text-amber-400 font-medium">
            <HelpCircle className="w-3.5 h-3.5" /> Partial (~)
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> Missing (✗)
          </span>
        </div>
      </div>

      {/* 3-State Skill Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {all_skill_states.map((item) => {
          const isStrong = item.state === 'Strong';
          const isPartial = item.state === 'Partial';

          const cardBg = isStrong
            ? 'bg-emerald-500/10 border-emerald-500/30'
            : isPartial
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-rose-500/10 border-rose-500/30';

          const textColor = isStrong
            ? 'text-emerald-300'
            : isPartial
            ? 'text-amber-300'
            : 'text-rose-300';

          return (
            <div key={item.skill} className={`p-4 rounded-xl border ${cardBg} space-y-2 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className={`font-heading font-bold text-sm ${textColor}`}>
                    {item.badge} {item.skill}
                  </span>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cardBg}`}>
                    {item.state}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-2 space-y-1">
                  <p>Current: <span className="font-semibold text-white">{item.current_proficiency}</span></p>
                  <p>Target: <span className="font-semibold text-white">{item.target_proficiency}</span></p>
                </div>
              </div>

              {!isStrong && (
                <div className="pt-2 border-t border-slate-800/60 mt-2 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <Clock className="w-3 h-3" /> {item.estimated_effort || '8 hrs'}
                  </span>
                  <button
                    onClick={() => onStartAssessment(item.skill)}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] rounded-lg shadow flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" /> Practice Quiz
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prioritized Missing Skills Ranking */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Actionable Skill Gap Priority Ranking
        </h3>

        <div className="space-y-2">
          {prioritized_gaps.high.map((gap, idx) => (
            <div key={gap.skill} className="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-rose-500/30">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{gap.skill}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                      HIGH PRIORITY
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{gap.why_it_matters}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1 rounded-lg">
                ~{gap.estimated_effort}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
