import React, { useState } from 'react';
import { BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { mockDemoBusiness } from '../services/api/mockData';
import { MSMEAnalysis } from '../types';

export const MSMEAssessmentPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<MSMEAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunAssessment = async () => {
    setLoading(true);
    try {
      const res = await apiService.analyzeMSME(mockDemoBusiness);
      setAnalysis(res);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">MSME Digital Maturity Assessment</h1>
        <p className="text-xs text-slate-400">Evaluate your store's tech stack, digital payment adoption, and inventory digitization index.</p>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-bold text-slate-100 mb-2">Evaluate Store Digital Readiness</h3>
        <p className="text-xs text-slate-400 mb-4">Run the 6-category MSME digitization scanner based on current technology adoption.</p>

        <Button variant="primary" isLoading={loading} onClick={handleRunAssessment} leftIcon={<BarChart3 className="w-4 h-4" />}>
          Run Digital Maturity Scan
        </Button>
      </Card>

      {analysis && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Digital Maturity Index</span>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-4xl font-black text-blue-400">{analysis.digital_maturity_score}/100</span>
                <Badge variant="primary">{analysis.maturity_level}</Badge>
              </div>
            </Card>

            <Card className="p-6 space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase">Key Identified Bottlenecks</h4>
              {analysis.key_bottlenecks.map((b, i) => (
                <div key={i} className="text-xs text-rose-300 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{b}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
