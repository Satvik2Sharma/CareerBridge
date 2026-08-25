import React from 'react';
import { MSMERecommendation } from '../types';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';

interface RecProps {
  recommendations: MSMERecommendation[];
}

export const MSMERecommendationsView: React.FC<RecProps> = ({ recommendations }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
          AI Business Intelligence
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">Top Technology & Growth Recommendations</h2>
        <p className="text-xs text-slate-400 mt-1">
          Prioritized actionable solutions designed for immediate productivity and sales growth.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const isHighImpact = rec.impact === 'HIGH';

          return (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition space-y-3"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-extrabold text-xs flex items-center justify-center">
                    #{rec.priority}
                  </span>
                  <h3 className="font-heading font-bold text-base text-white">{rec.title}</h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {rec.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-bold px-2.5 py-0.5 rounded-full ${
                      isHighImpact
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}
                  >
                    ⚡ {rec.impact} IMPACT
                  </span>
                  <span className="text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                    Effort: {rec.effort}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Current Pain Point
                  </span>
                  <p className="text-slate-300">{rec.problem}</p>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Recommended Solution
                  </span>
                  <p className="text-slate-300">{rec.solution}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="flex items-center gap-1 text-emerald-300 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> {rec.expected_benefit}
                </span>
                <span className="text-[11px] text-slate-400">Cost: {rec.cost_category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
