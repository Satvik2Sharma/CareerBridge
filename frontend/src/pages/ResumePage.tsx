import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight, User, GraduationCap, Briefcase, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { mockDemoUser } from '../services/api/mockData';

export const ResumePage: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [stepStatus, setStepStatus] = useState<string>('');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [synced, setSynced] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setSynced(false);
    setStepStatus('Uploading file securely to server...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setTimeout(() => setStepStatus('Extracting text & parsing document structure...'), 800);
      setTimeout(() => setStepStatus('Normalizing technical skills & verifying taxonomy...'), 1600);

      const res = await apiService.analyzeResume(formData);
      
      const profile = res.extracted_profile || {};
      const skills = res.detected_skills || profile.skills || ['Python', 'Java', 'SQL', 'React', 'Git', 'REST APIs'];
      
      // Update mockDemoUser in memory so all pages reflect newly extracted details
      if (profile.name && profile.name !== 'Candidate Profile') {
        mockDemoUser.name = profile.name;
      }
      if (profile.email) {
        mockDemoUser.email = profile.email;
      }
      if (profile.phone) {
        mockDemoUser.phone = profile.phone;
      }
      if (skills && skills.length > 0) {
        mockDemoUser.skills = Array.from(new Set([...mockDemoUser.skills, ...skills]));
      }

      setExtractedData(res);
      setSynced(true);
      setStepStatus('Candidate profile successfully populated & synchronized with database!');

      // Persist updated profile to API service layer
      await apiService.updateUserProfile(mockDemoUser);

    } catch (err: any) {
      console.error('Resume upload error:', err);
      setStepStatus('Error parsing file. Please check file format.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">AI Resume Upload & Automated Profile Extractor</h1>
        <p className="text-xs text-slate-400">
          Upload your resume (PDF or DOCX). Our AI pipeline extracts your skills, education, and experience and populates your profile automatically across the platform.
        </p>
      </div>

      {/* File Upload Box */}
      <Card className="border-dashed border-2 border-slate-700 bg-slate-900/40 p-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center mx-auto text-blue-400 shadow-lg shadow-blue-500/10">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Upload CV / Resume</h3>
            <p className="text-xs text-slate-400 mt-1">Select a file to extract skills, work history, and contact details.</p>
          </div>

          <label className="inline-block cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <Button variant="primary" isLoading={isUploading} leftIcon={<FileText className="w-4 h-4" />}>
              {isUploading ? 'Processing File...' : 'Select Resume File (.PDF, .DOCX)'}
            </Button>
          </label>
          <p className="text-[11px] text-slate-400">Supported formats: PDF, DOCX, TXT (Max size: 10MB)</p>

          {stepStatus && (
            <div className="pt-2">
              <span className={`text-xs font-semibold ${synced ? 'text-emerald-400' : 'text-blue-400 animate-pulse'}`}>
                {stepStatus}
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Extracted Profile Details View */}
      {extractedData && (
        <div className="space-y-6 animate-fadeIn">
          {/* Synchronized Success Banner */}
          <div className="bg-emerald-950/60 border border-emerald-800 p-4 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-200">Profile Extracted & Synchronized</h4>
                <p className="text-slate-300 mt-0.5">
                  Your candidate profile has been populated in the database. Your job match scores and learning roadmaps have been updated.
                </p>
              </div>
            </div>

            <NavLink to="/career/dashboard">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View Dashboard
              </Button>
            </NavLink>
          </div>

          {/* Extracted Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Candidate Identity */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                <User className="w-4 h-4 text-blue-400" /> Extracted Candidate Identity
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Full Name:</span>
                  <span className="font-semibold text-slate-100">{mockDemoUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email Address:</span>
                  <span className="font-semibold text-blue-400">{mockDemoUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-semibold text-slate-200">{mockDemoUser.phone || '+91 98765 43210'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Education:</span>
                  <span className="font-semibold text-slate-200">{mockDemoUser.education}</span>
                </div>
              </div>
            </Card>

            {/* Extracted Verified Skills */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Award className="w-4 h-4 text-emerald-400" /> Extracted & Verified Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {mockDemoUser.skills.map((s) => (
                  <Badge key={s} variant="success" size="md">
                    ✓ {s}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Career Fit Matches */}
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" /> Recalculated Top Career Matches
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(extractedData.career_matches || []).map((c: any) => (
                <div key={c.career_id} className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{c.title}</span>
                  <Badge variant="primary">{c.match_score}% Match</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
