import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight, Layers, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { CareerRecommendation } from '../types';
import { mockDemoUser } from '../services/api/mockData';

export const CareerExplorerPage: React.FC = () => {
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);

  useEffect(() => {
    async function loadCareers() {
      const res = await apiService.getCareerRecommendations(mockDemoUser);
      setRecommendations(res.career_recommendations);
    }
    loadCareers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Career Explorer & Fit Engine</h1>
          <p className="text-xs text-slate-400">Discover which engineering and technology careers best match your background.</p>
        </div>
        <NavLink to="/career/careers/compare">
          <Button variant="outline" size="sm" leftIcon={<Layers className="w-4 h-4" />}>
            Compare Career Matrix
          </Button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((c) => (
          <Card key={c.career_id} hoverEffect className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="primary">{c.category}</Badge>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{c.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-400">{c.match_score}%</span>
                <span className="text-[10px] text-slate-400 block">Match Score</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Preparation Effort:</span>
                <span className="font-semibold text-slate-200">{c.prep_effort_months}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Typical Entry Experience:</span>
                <span className="font-semibold text-slate-200">{c.typical_experience}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="text-[11px] text-slate-400 w-full mb-1">Strong Skill Alignment:</span>
              {c.strengths.map((s) => (
                <Badge key={s} variant="success" size="sm">
                  ✓ {s}
                </Badge>
              ))}
            </div>

            <NavLink to="/career/roadmap" className="block pt-2">
              <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Personalized Roadmap
              </Button>
            </NavLink>
          </Card>
        ))}
      </div>
    </div>
  );
};
