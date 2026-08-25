import React from 'react';
import { MSMERoadmapPhase } from '../types';
import { Calendar, CheckSquare, Target } from 'lucide-react';

interface RoadmapProps {
  phases: MSMERoadmapPhase[];
}

export const MSMEGrowthRoadmap: React.FC<RoadmapProps> = ({ phases }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
          Execution Roadmap
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">90-Day Digital Growth Roadmap</h2>
        <p className="text-xs text-slate-400 mt-1">
          A step-by-step phased transition plan designed to digitize business operations cleanly over 3 months.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phases.map((phase) => (
          <div
            key={phase.month}
            className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden group hover:border-emerald-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-extrabold font-heading text-sm flex items-center justify-center border border-emerald-500/30">
                M{phase.month}
              </span>
              <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                Month {phase.month}
              </span>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base text-white">{phase.phase}</h3>
              <p className="text-xs text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> Focus: {phase.focus}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              {phase.action_items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
