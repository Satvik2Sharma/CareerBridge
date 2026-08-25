import React from 'react';
import { Calendar, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockMSMEAnalysis } from '../services/api/mockData';

export const MSMERoadmapPage: React.FC = () => {
  const phases = [
    { title: 'Phase 1: Days 1 – 30', subtitle: 'Foundation & Billing Digitization', items: mockMSMEAnalysis.roadmap_90_day.phase_1_days_1_30 },
    { title: 'Phase 2: Days 31 – 60', subtitle: 'Customer Engagement & Catalog Launch', items: mockMSMEAnalysis.roadmap_90_day.phase_2_days_31_60 },
    { title: 'Phase 3: Days 61 – 90', subtitle: 'Growth Analytics & Automation', items: mockMSMEAnalysis.roadmap_90_day.phase_3_days_61_90 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">90-Day MSME Digital Transformation Roadmap</h1>
        <p className="text-xs text-slate-400">Actionable phased implementation blueprint for retail and manufacturing business growth.</p>
      </div>

      <div className="space-y-6">
        {phases.map((phase, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary" size="md">{phase.title}</Badge>
              <h3 className="text-base font-bold text-slate-100">{phase.subtitle}</h3>
            </div>

            <div className="space-y-2 text-xs">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
