import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Filter, Briefcase, MapPin, DollarSign, Building2, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { apiService } from '../services/api';
import { JobRecommendation } from '../types';
import { mockDemoUser } from '../services/api/mockData';

export const JobDiscoveryPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('ALL');

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const res = await apiService.getJobRecommendations(mockDemoUser);
        setRecommendations(res.top_recommendations);
      } catch {
        // Fallback handled in apiService
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const filtered = recommendations.filter((r) => {
    const matchesSearch =
      r.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWorkType =
      selectedWorkType === 'ALL' || r.job_details.work_type.toUpperCase() === selectedWorkType;
    return matchesSearch && matchesWorkType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Job Discovery & Match Engine</h1>
        <p className="text-xs text-slate-400">Discover private sector jobs matched to your verified skills with transparent match score breakdowns.</p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search by job title, company, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex items-center gap-2">
          {['ALL', 'HYBRID', 'REMOTE', 'ONSITE'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedWorkType(type)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                selectedWorkType === type
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listing Cards */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton variant="rectangular" className="h-32" />
          <Skeleton variant="rectangular" className="h-32" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-200">No matching jobs found</h3>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or work location preferences.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((rec) => {
            const j = rec.job_details;
            return (
              <Card key={rec.job_id} hoverEffect className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-slate-100">{rec.job_title}</h3>
                      <Badge variant="primary">{rec.overall_match}% Match</Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" /> {rec.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {j.location} ({j.work_type})
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <DollarSign className="w-3.5 h-3.5" /> {j.salary_range}
                      </span>
                    </div>

                    {/* Matched & Missing Skills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-400">Matched:</span>
                      {rec.matched_skills.map((s) => (
                        <Badge key={s} variant="success" size="sm">
                          ✓ {s}
                        </Badge>
                      ))}
                      {rec.missing_skills.length > 0 && (
                        <>
                          <span className="text-[11px] text-slate-400 ml-2">Missing:</span>
                          {rec.missing_skills.map((s) => (
                            <Badge key={s} variant="warning" size="sm">
                              ○ {s}
                            </Badge>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <NavLink to={`/career/jobs/${rec.job_id}`}>
                    <Button variant="secondary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                      View Details & Match
                    </Button>
                  </NavLink>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
