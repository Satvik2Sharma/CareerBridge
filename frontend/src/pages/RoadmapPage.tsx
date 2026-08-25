import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle, Clock, ExternalLink, Play } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { LearningRoadmapItem } from '../types';
import { mockDemoUser } from '../services/api/mockData';

export const RoadmapPage: React.FC = () => {
  const [roadmap, setRoadmap] = useState<LearningRoadmapItem[]>([]);

  useEffect(() => {
    async function loadRoadmap() {
      const res = await apiService.getPersonalizedRoadmap(mockDemoUser, 'Backend Developer');
      setRoadmap(res.roadmap);
    }
    loadRoadmap();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Personalized Learning Roadmap</h1>
        <p className="text-xs text-slate-400">Step-by-step custom curriculum designed to bridge your missing skills for Backend Developer.</p>
      </div>

      <div className="space-y-4">
        {roadmap.map((item) => (
          <Card key={item.step} className="p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  item.status === 'COMPLETED'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : item.status === 'IN_PROGRESS'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}>
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-100">{item.skill}</h3>
                    <Badge variant={item.priority === 'HIGH' ? 'danger' : 'warning'} size="sm">
                      {item.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Estimated Duration: {item.estimated_weeks || 2} weeks
                  </p>
                </div>
              </div>

              <Badge variant={item.status === 'COMPLETED' ? 'success' : item.status === 'IN_PROGRESS' ? 'primary' : 'default'}>
                {item.status.replace('_', ' ')}
              </Badge>
            </div>

            {/* Resources */}
            {item.resources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-300">Recommended Learning Resource:</p>
                {item.resources.map((r) => (
                  <div key={r.id} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="font-semibold text-slate-200 block">{r.title}</span>
                      <span className="text-slate-400 text-[11px]">{r.provider} • {r.duration}</span>
                    </div>
                    <a href={r.url} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                        Open Resource
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
