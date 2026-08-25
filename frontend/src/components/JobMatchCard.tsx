import React, { useState } from 'react';
import { JobRecommendation } from '../types';
import { CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, MapPin, Building, Award } from 'lucide-react';

interface JobMatchCardProps {
  recommendation: JobRecommendation;
  onSelectSkillGap: (jobId: string) => void;
}

export const JobMatchCard: React.FC<JobMatchCardProps> = ({ recommendation, onSelectSkillGap }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { job_title, company, overall_match, matched_skills, missing_skills, breakdown, explanation, job_details } = recommendation;

  const matchColor =
    overall_match >= 85
      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
      : overall_match >= 70
      ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
      : 'border-amber-500/50 bg-amber-500/10 text-amber-400';

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Header Title & Details */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white tracking-tight">{job_title}</h3>
            {overall_match >= 85 && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                Top Match
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-300">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              {company}
            </span>
            {job_details && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {job_details.location} ({job_details.work_type})
                </span>
                <span>•</span>
                <span className="font-semibold text-slate-300">{job_details.salary_range}</span>
              </>
            )}
          </div>
        </div>

        {/* Overall Match Ring / Badge */}
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-xl border font-heading font-extrabold text-lg flex items-center gap-1.5 shadow-sm ${matchColor}`}>
            <Award className="w-5 h-5" />
            <span>{overall_match}% MATCH</span>
          </div>
          <button
            onClick={() => onSelectSkillGap(recommendation.job_id)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all"
          >
            View Skill Gap Analysis
          </button>
        </div>
      </div>

      {/* Natural Language AI Explanation */}
      {explanation && (
        <p className="mt-3 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 italic leading-relaxed">
          "{explanation}"
        </p>
      )}

      {/* Matched vs Missing Skills Badges */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Matching Verified Skills ({matched_skills.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {matched_skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Skill Gaps To Address ({missing_skills.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {missing_skills.length > 0 ? (
              missing_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20"
                >
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-emerald-400 font-medium">No required skill gaps missing!</span>
            )}
          </div>
        </div>
      </div>

      {/* Match Breakdown Expandable Section */}
      <div className="mt-3 pt-2">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 transition"
        >
          <span>{showBreakdown ? 'Hide Scoring Breakdown' : 'Show Deterministic Match Breakdown'}</span>
          {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showBreakdown && breakdown && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Required Skills (40%)</span>
              <span className="font-bold text-white">{breakdown.required_skill_match}%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Skill Proficiency (20%)</span>
              <span className="font-bold text-white">{breakdown.proficiency_match}%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Career Goal (15%)</span>
              <span className="font-bold text-white">{breakdown.career_goal_alignment}%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Experience (10%)</span>
              <span className="font-bold text-white">{breakdown.experience_match}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
