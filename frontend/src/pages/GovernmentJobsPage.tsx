import React, { useState, useEffect } from 'react';
import { ShieldCheck, ExternalLink, CheckCircle2, Search, Award, HelpCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { apiService } from '../services/api';
import { GovernmentRecruitment, GovernmentEligibilityResult } from '../types';

export const GovernmentJobsPage: React.FC = () => {
  const [recruitments, setRecruitments] = useState<GovernmentRecruitment[]>([]);
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState<number>(24);
  const [degree, setDegree] = useState<string>('B.Tech');
  const [category, setCategory] = useState<string>('OBC');
  const [eligibilityResult, setEligibilityResult] = useState<GovernmentEligibilityResult | null>(null);

  useEffect(() => {
    async function loadGov() {
      setLoading(true);
      try {
        const res = await apiService.getGovernmentRecruitments();
        setRecruitments(res.recruitments);
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadGov();
  }, []);

  const handleCheckEligibility = async () => {
    const result = await apiService.checkGovernmentEligibility({
      candidate_age: age,
      degree,
      category,
      experience_years: 0.5
    });
    setEligibilityResult(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-400" />
          <h1 className="text-2xl font-bold text-slate-100">Government Opportunities & Eligibility Intelligence</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">Official recruitment notifications from UPSC, SSC, IBPS, and Railway Recruitment Boards with automated category age relaxation checkers.</p>
      </div>

      {/* Official Government Eligibility Checker */}
      <Card className="border-amber-500/30 bg-amber-950/10 p-6">
        <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-amber-400" /> Government Post Official Eligibility Checker
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <Input
            label="Candidate Age"
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 18)}
          />
          <Input
            label="Educational Qualification"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Reservation Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200"
            >
              <option value="GENERAL">General / Unreserved</option>
              <option value="EWS">EWS</option>
              <option value="OBC">OBC (3 Yrs Age Relaxation)</option>
              <option value="SC">SC (5 Yrs Age Relaxation)</option>
              <option value="ST">ST (5 Yrs Age Relaxation)</option>
              <option value="PWD">PWD (10 Yrs Age Relaxation)</option>
            </select>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={handleCheckEligibility}>
          Evaluate Eligibility Rules
        </Button>

        {eligibilityResult && (
          <div className="mt-4 p-4 bg-slate-900/90 border border-slate-800 rounded-lg space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Official Evaluation Status:</span>
              <Badge variant={eligibilityResult.is_eligible ? 'success' : 'danger'}>
                {eligibilityResult.status}
              </Badge>
            </div>
            <p className="text-slate-300">{eligibilityResult.explanation}</p>
            <div className="pt-2 text-[11px] text-slate-400">
              Effective Category Max Age: <span className="text-amber-300 font-semibold">{eligibilityResult.effective_age_limit} years</span> (+{eligibilityResult.category_relaxation_years} yrs {category} relaxation).
            </div>
          </div>
        )}
      </Card>

      {/* Recruitment Bulletin Listings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100">Active Central & State Recruitment Bulletins</h2>
        {recruitments.map((rec) => (
          <Card key={rec.id} hoverEffect className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="warning">{rec.recruiting_body}</Badge>
                  <span className="text-xs text-slate-400">Notification: {rec.notification_number || 'Official'}</span>
                </div>
                <h3 className="text-base font-bold text-slate-100">{rec.recruitment_name}</h3>
                <p className="text-xs text-slate-300">Total Vacancies: <span className="font-semibold text-amber-400">{rec.total_vacancies} posts</span></p>

                {/* Posts Breakdown */}
                <div className="mt-3 space-y-2">
                  {rec.posts.map((p) => (
                    <div key={p.id} className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="font-semibold text-slate-200">{p.post_name}</span>
                        <span className="text-slate-400 block text-[11px]">{p.department} • {p.pay_level}</span>
                      </div>
                      <Badge variant="info">Max Age: {p.age_max} yrs</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[160px]">
                <a href={rec.official_apply_url || rec.notification_url || '#'} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="w-full" leftIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Official Notification
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
