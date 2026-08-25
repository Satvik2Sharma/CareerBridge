import React, { useState, useEffect } from 'react';
import { UserProfile, JobRecommendation, SkillGapAnalysis, CareerRecommendation, LearningRoadmapItem, Assessment, AssessmentResult } from '../types';
import { api } from '../services/api';
import { JobMatchCard } from '../components/JobMatchCard';
import { SkillGapChart } from '../components/SkillGapChart';
import { CareerComparison } from '../components/CareerComparison';
import { PersonalizedRoadmapView } from '../components/PersonalizedRoadmapView';
import { AssessmentQuizModal } from '../components/AssessmentQuizModal';
import { Upload, User, Award, Briefcase, Zap, Plus, X, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface CareerDashboardProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const CareerDashboard: React.FC<CareerDashboardProps> = ({ userProfile, setUserProfile }) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'gaps' | 'careers' | 'roadmap'>('jobs');
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');
  const [gapAnalysis, setGapAnalysis] = useState<SkillGapAnalysis | null>(null);
  const [careerPaths, setCareerPaths] = useState<CareerRecommendation[]>([]);
  const [roadmap, setRoadmap] = useState<LearningRoadmapItem[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);
  
  const [newSkillInput, setNewSkillInput] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Load Job Recommendations & Career paths whenever user profile changes
  useEffect(() => {
    loadRecommendations();
    loadCareerPaths();
    loadAssessments();
  }, [userProfile]);

  // Load Skill Gap whenever selectedJobId or user profile changes
  useEffect(() => {
    if (selectedJobId) {
      loadSkillGap(selectedJobId);
    }
  }, [selectedJobId, userProfile]);

  const loadRecommendations = async () => {
    setLoadingJobs(true);
    try {
      const res = await api.getJobRecommendations(userProfile);
      if (res.top_recommendations && res.top_recommendations.length > 0) {
        setRecommendations(res.top_recommendations);
        if (!selectedJobId) {
          setSelectedJobId(res.top_recommendations[0].job_id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingJobs(false);
    }
  };

  const loadSkillGap = async (jobId: string) => {
    try {
      const data = await api.getSkillGap(jobId, userProfile.skills);
      setGapAnalysis(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadCareerPaths = async () => {
    try {
      const res = await api.getCareerRecommendations(userProfile);
      if (res.career_recommendations) {
        setCareerPaths(res.career_recommendations);
        // Load default roadmap for top career choice
        if (res.career_recommendations.length > 0) {
          loadRoadmap(res.career_recommendations[0].title, res.career_recommendations[0].gaps);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadRoadmap = async (goal: string, gaps: string[]) => {
    try {
      const res = await api.getPersonalizedRoadmap(userProfile, goal, gaps);
      if (res.roadmap) {
        setRoadmap(res.roadmap);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadAssessments = async () => {
    try {
      const res = await api.getAssessments();
      if (res.assessments) {
        setAssessments(res.assessments);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const parsed = await api.analyzeResume(formData);
      
      if (parsed.skills) {
        setUserProfile((prev) => ({
          ...prev,
          name: parsed.name || prev.name,
          skills: Array.from(new Set([...prev.skills, ...parsed.skills])),
          projects: parsed.projects || prev.projects,
          certifications: parsed.certifications || prev.certifications
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    const clean = newSkillInput.trim();
    if (!userProfile.skills.includes(clean)) {
      setUserProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, clean]
      }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setUserProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleStartQuiz = (skillName: string) => {
    const quiz = assessments.find((a) => a.skill.toLowerCase() === skillName.toLowerCase()) || assessments[0];
    if (quiz) {
      setActiveQuiz(quiz);
    }
  };

  const handleQuizSuccess = (result: AssessmentResult) => {
    setUserProfile((prev) => ({
      ...prev,
      readiness_score: result.new_readiness_score,
      skills: Array.from(new Set([...prev.skills, result.skill]))
    }));
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Profile Summary & Readiness Gauge */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              Verified Candidate Profile
            </span>
            <span className="text-xs text-slate-400 font-medium">• {userProfile.education}</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">{userProfile.name}</h1>
          <p className="text-xs text-slate-300">
            Target Career Goal: <strong className="text-blue-300">{userProfile.career_goal}</strong>
          </p>

          {/* User Skills Tag Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-2">
            {userProfile.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-400 ml-0.5 text-slate-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Quick Add Skill Input */}
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                placeholder="Add skill..."
                className="bg-slate-900 text-xs px-2.5 py-1 rounded-lg border border-slate-800 text-white focus:outline-none focus:border-blue-500 w-24"
              />
              <button
                onClick={handleAddSkill}
                className="p-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Readiness Score Ring & Upload Button */}
        <div className="flex items-center gap-6">
          <div className="text-center bg-slate-900/90 p-4 rounded-2xl border border-blue-500/30 glow-blue">
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">Career Readiness</span>
            <div className="text-3xl font-extrabold font-heading text-white mt-0.5 flex items-center justify-center gap-1">
              <span>{userProfile.readiness_score}%</span>
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-1">14 Opportunities Unlocked</span>
          </div>

          <label className="cursor-pointer px-4 py-3 bg-slate-800 hover:bg-slate-700 text-blue-300 font-semibold text-xs rounded-2xl border border-blue-500/30 shadow-lg flex items-center gap-2 transition">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>{uploadingResume ? 'Parsing PDF...' : 'Upload PDF Resume'}</span>
            <input type="file" accept=".pdf,.txt" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'jobs'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Top 5 Job Recommendations ({recommendations.length})
        </button>

        <button
          onClick={() => setActiveTab('gaps')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'gaps'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" /> Skill Gap Analysis
        </button>

        <button
          onClick={() => setActiveTab('careers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'careers'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Career Taxonomy Fits ({careerPaths.length})
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'roadmap'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> Personalized Roadmap ({roadmap.length} Steps)
        </button>
      </div>

      {/* Main Content Tab Views */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">TOP 5 RECOMMENDED OPPORTUNITIES</h2>
            <span className="text-xs text-slate-400">Scored deterministically using 5-weight matching engine</span>
          </div>

          {loadingJobs ? (
            <div className="text-center py-12 text-slate-400 text-xs">Evaluating job compatibility...</div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((item) => (
                <JobMatchCard
                  key={item.job_id}
                  recommendation={item}
                  onSelectSkillGap={(jobId) => {
                    setSelectedJobId(jobId);
                    setActiveTab('gaps');
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'gaps' && (
        <SkillGapChart
          analysis={gapAnalysis}
          onStartAssessment={handleStartQuiz}
        />
      )}

      {activeTab === 'careers' && (
        <CareerComparison
          careers={careerPaths}
          onSelectCareerGoal={(title, gaps) => {
            setUserProfile((prev) => ({ ...prev, career_goal: title }));
            loadRoadmap(title, gaps);
            setActiveTab('roadmap');
          }}
        />
      )}

      {activeTab === 'roadmap' && (
        <PersonalizedRoadmapView
          careerGoal={userProfile.career_goal}
          userSkills={userProfile.skills}
          roadmap={roadmap}
          onCompleteTask={(week) => {
            setRoadmap((prev) =>
              prev.map((item) => (item.week === week ? { ...item, status: 'completed' } : item))
            );
          }}
        />
      )}

      {/* Interactive Assessment Modal */}
      {activeQuiz && (
        <AssessmentQuizModal
          assessment={activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onSuccess={handleQuizSuccess}
        />
      )}
    </div>
  );
};
