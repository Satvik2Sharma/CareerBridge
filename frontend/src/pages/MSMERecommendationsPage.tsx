import React from 'react';
import { Sparkles, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockMSMEAnalysis } from '../services/api/mockData';

export const MSMERecommendationsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">MSME Technology Recommendations Catalog</h1>
        <p className="text-xs text-slate-400">Curated, low-cost digital tools and workflows customized for micro & small enterprises.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockMSMEAnalysis.recommendations.map((rec) => (
          <Card key={rec.id} hoverEffect className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <Badge variant="primary">{rec.category}</Badge>
              <Badge variant="success">{rec.cost_category}</Badge>
            </div>

            <h3 className="text-base font-bold text-slate-100">{rec.title}</h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-rose-950/20 border border-rose-800/40 rounded text-rose-300">
                <span className="font-semibold block text-[11px] text-rose-400">Problem:</span>
                {rec.problem}
              </div>
              <div className="p-2.5 bg-emerald-950/20 border border-emerald-800/40 rounded text-emerald-300">
                <span className="font-semibold block text-[11px] text-emerald-400">Solution & Benefit:</span>
                {rec.solution} — <span className="font-medium">{rec.expected_benefit}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
