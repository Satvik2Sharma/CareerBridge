import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck, Target, Zap } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { Job, JobRecommendation } from '../types';
import { mockDemoUser } from '../services/api/mockData';

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [recommendation, setRecommendation] = useState<JobRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    async function loadJobData() {
      if (!id) return;
      setLoading(true);
      try {
        const j = await apiService.getJobById(id);
        setJob(j);

        const recs = await apiService.getJobRecommendations(mockDemoUser);
        const match = recs.top_recommendations.find((r) => r.job_id === id);
        if (match) {
          setRecommendation(match);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadJobData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-slate-400 text-xs">Loading opportunity details & match breakdown...</div>;
  }

  if (!job) {
    return (
      <Card className="text-center py-12">
        <h3 className="text-base font-semibold text-slate-200">Job Opportunity Not Found</h3>
        <NavLink to="/career/jobs" className="mt-4 inline-block">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Job Search
          </Button>
        </NavLink>
      </Card>
    );
  }

  const matchPercent = recommendation ? recommendation.overall_match : 88;

  return (
    <div className="space-y-6">
      <NavLink to="/career/jobs" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Job Search
      </NavLink>

      <Card className="p-6 space-y-6">
        {/* Job Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-100">{job.title}</h1>
              <Badge variant={matchPercent > 80 ? 'success' : 'primary'} size="md">
                {matchPercent}% Match Score
              </Badge>
            </div>
            <p className="text-sm font-medium text-blue-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> {job.company}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={applied ? 'success' : 'primary'}
              onClick={() => setApplied(true)}
              leftIcon={applied ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            >
              {applied ? 'Application Submitted' : 'One-Click Apply'}
            </Button>
            <a href={job.source_url || '#'} target="_blank" rel="noreferrer">
              <Button variant="outline" leftIcon={<ExternalLink className="w-4 h-4" />}>
                Official Portal
              </Button>
            </a>
          </div>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Location & Work Type</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{job.location} ({job.work_type})</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Salary Compensation</span>
            <span className="font-semibold text-emerald-400 mt-0.5 block">{job.salary_range}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Experience Level</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{job.experience_level}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Verification Source</span>
            <span className="font-semibold text-cyan-400 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {job.source || 'CareerBridge Partner'}
            </span>
          </div>
        </div>

        {/* Transparent Match Engine Breakdown */}
        {recommendation && (
          <div className="space-y-3 bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Deterministic Match Engine Breakdown</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{recommendation.explanation}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Skill Overlap Match</span>
                <span className="text-lg font-bold text-blue-400 mt-0.5 block">
                  {recommendation.breakdown.required_skill_match}%
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Proficiency Level</span>
                <span className="text-lg font-bold text-emerald-400 mt-0.5 block">
                  {recommendation.breakdown.proficiency_match}%
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Career Alignment</span>
                <span className="text-lg font-bold text-indigo-400 mt-0.5 block">
                  {recommendation.breakdown.career_goal_alignment}%
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Education & Location</span>
                <span className="text-lg font-bold text-cyan-400 mt-0.5 block">
                  {recommendation.breakdown.education_compatibility}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Job Description */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-2">Job Description</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-100 mb-3">Required & Preferred Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.required_skills.map((s) => (
                <Badge key={s} variant="primary" size="md">
                  Required: {s}
                </Badge>
              ))}
              {job.preferred_skills.map((s) => (
                <Badge key={s} variant="outline" size="md">
                  Preferred: {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
