import React from 'react';
import { Building2, Shield, CreditCard, Box, Globe, LineChart, Megaphone } from 'lucide-react';

interface MaturityProps {
  score: number;
  categoryScores: Record<string, number>;
  businessName: string;
  businessType: string;
}

export const MSMEDigitalMaturityCard: React.FC<MaturityProps> = ({
  score,
  categoryScores,
  businessName,
  businessType,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Payments':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'Inventory':
        return <Box className="w-4 h-4 text-amber-400" />;
      case 'Online Presence':
        return <Globe className="w-4 h-4 text-blue-400" />;
      case 'Analytics':
        return <LineChart className="w-4 h-4 text-purple-400" />;
      case 'Marketing':
        return <Megaphone className="w-4 h-4 text-rose-400" />;
      default:
        return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            MSME Digital Maturity Assessment
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">{businessName}</h2>
          <span className="text-xs text-slate-400">{businessType} • Roorkee, Uttarakhand</span>
        </div>

        {/* 0-100 Score Gauge Badge */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-xl border border-emerald-500/30">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold font-heading text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            {score}
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Maturity Score</span>
            <span className="text-xs font-semibold text-emerald-300">
              {score >= 70 ? 'Advanced Digital Capability' : score >= 40 ? 'Moderate Digital Maturity' : 'Early Phase Digital Readiness'}
            </span>
          </div>
        </div>
      </div>

      {/* 6 Category Breakdown Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Digital Maturity Dimension Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(categoryScores).map(([cat, catScore]) => (
            <div key={cat} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-semibold text-white">
                  {getCategoryIcon(cat)}
                  {cat}
                </span>
                <span className="font-extrabold text-white">{catScore}%</span>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    catScore >= 70
                      ? 'bg-emerald-400'
                      : catScore >= 40
                      ? 'bg-blue-400'
                      : 'bg-amber-400'
                  }`}
                  style={{ width: `${catScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
