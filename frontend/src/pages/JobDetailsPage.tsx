import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { Job } from '../types';

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJob() {
      if (!id) return;
      setLoading(true);
      try {
        const j = await apiService.getJobById(id);
        setJob(j);
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-slate-400">Loading opportunity details...</div>;
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

  return (
    <div className="space-y-6">
      <NavLink to="/career/jobs" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Job Search
      </NavLink>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-100">{job.title}</h1>
              <Badge variant="success">89% Match</Badge>
            </div>
            <p className="text-sm font-medium text-blue-400 mt-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> {job.company}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href={job.source_url || '#'} target="_blank" rel="noreferrer">
              <Button variant="primary" leftIcon={<ExternalLink className="w-4 h-4" />}>
                Apply on Official Site
              </Button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block">Location & Type</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{job.location} ({job.work_type})</span>
          </div>
          <div>
            <span className="text-slate-400 block">Compensation</span>
            <span className="font-semibold text-emerald-400 mt-0.5 block">{job.salary_range}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Experience Level</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">{job.experience_level}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Verification Source</span>
            <span className="font-semibold text-cyan-400 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {job.source || 'Verified Partner'}
            </span>
          </div>
        </div>

        <div className="py-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-2">Job Description</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">Required & Preferred Skills</h3>
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
