import React, { useState, useEffect } from 'react';
import { Layers, ArrowRight, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { SkillGapAnalysis } from '../types';
import { mockDemoUser } from '../services/api/mockData';

export const SkillGapPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);

  useEffect(() => {
    async function loadGap() {
      const res = await apiService.getSkillGap('car-2', mockDemoUser.skills);
      setAnalysis(res);
    }
    loadGap();
  }, []);

  if (!analysis) return <div className="text-center py-12 text-slate-400">Analyzing skill gap...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Skill Gap Breakdown</h1>
        <p className="text-xs text-slate-400">Detailed classification of verified skills versus target career requirements for <span className="font-semibold text-blue-400">{analysis.target_title}</span>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-emerald-500/30 bg-emerald-950/10">
          <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Strong & Matched Skills ({analysis.strong_skills.length + analysis.matched_skills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {[...analysis.strong_skills, ...analysis.matched_skills].map((s) => (
              <Badge key={s} variant="success">
                ✓ {s}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="border-amber-500/30 bg-amber-950/10">
          <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Partial Proficiency ({analysis.partial_skills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.partial_skills.map((s) => (
              <Badge key={s} variant="warning">
                ◐ {s}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="border-rose-500/30 bg-rose-950/10">
          <h3 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Priority Skill Gaps ({analysis.priority_missing_skills.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.priority_missing_skills.map((s) => (
              <Badge key={s} variant="danger">
                ○ {s}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-bold text-slate-100 mb-3">Recommended Learning Actions</h3>
        <ul className="space-y-2 text-xs text-slate-300">
          {analysis.recommended_learning_actions.map((act, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
