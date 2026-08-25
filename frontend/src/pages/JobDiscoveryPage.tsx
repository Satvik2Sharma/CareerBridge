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
        setRecommendations(res.top_recommendations || []);
      } catch {
        setRecommendations([]);
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
      selectedWorkType === 'ALL' || r.job_details?.work_type?.toUpperCase() === selectedWorkType;
    return matchesSearch && matchesWorkType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Job Discovery & Match Engine</h1>
        <p className="text-xs text-slate-400">Discover private sector jobs matched to your verified skills with transparent match score breakdowns.</p>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search job title, skills, or company..."
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedWorkType}
            onChange={(e) => setSelectedWorkType(e.target.value)}
          >
            <option value="ALL">All Work Types</option>
            <option value="REMOTE">Remote</option>
            <option value="HYBRID">Hybrid</option>
            <option value="ON-SITE">On-site</option>
          </select>
        </div>
      </Card>

      {/* Job Listings List */}
      {loading ? (
        <div className="space-y-4">
          <Skeleton variant="rectangular" className="h-32" />
          <Skeleton variant="rectangular" className="h-32" />
          <Skeleton variant="rectangular" className="h-32" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-200">No opportunities available.</h3>
          <p className="text-xs text-slate-400 mt-1">Complete your profile or upload your resume to generate personalized job recommendations.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((rec) => {
            const j = rec.job_details || {};
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
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {j.location || 'Remote'} ({j.work_type || 'Hybrid'})
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <DollarSign className="w-3.5 h-3.5" /> {j.salary_range || 'Competitive'}
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
