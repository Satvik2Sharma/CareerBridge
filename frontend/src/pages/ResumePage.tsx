import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { apiService } from '../services/api';
import { ResumeAnalysisResult } from '../types';

export const ResumePage: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await apiService.analyzeResume(formData);
      setAnalysisResult(res);
    } catch {
      // Fallback handled inside apiService
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">AI Resume Analysis & Profile Extractor</h1>
        <p className="text-xs text-slate-400">Upload your CV/Resume (PDF or DOCX) to automatically extract your skills, experience, and career readiness profile.</p>
      </div>

      <Card className="border-dashed border-2 border-slate-700 bg-slate-900/40 p-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-blue-950/80 border border-blue-800/80 flex items-center justify-center mx-auto text-blue-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">Upload Your Resume</h3>
            <p className="text-xs text-slate-400 mt-1">Drag and drop your resume file or click below to select.</p>
          </div>

          <label className="inline-block cursor-pointer">
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <Button variant="primary" isLoading={isUploading} leftIcon={<FileText className="w-4 h-4" />}>
              {isUploading ? 'Parsing Resume with AI...' : 'Select Resume File'}
            </Button>
          </label>
          <p className="text-[11px] text-slate-400">Supported formats: PDF, DOCX (Max size: 5MB)</p>
        </div>
      </Card>

      {analysisResult && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-blue-950/40 border border-blue-800/60 p-4 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-200">AI Resume Parsing Analysis</h4>
              <p className="text-xs text-slate-300 mt-0.5">{analysisResult.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-semibold text-slate-100 mb-3">Extracted Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.detected_skills.map((s) => (
                  <Badge key={s} variant="success">
                    ✓ {s}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-slate-100 mb-3">Top Career Fit Matches</h3>
              <div className="space-y-2">
                {analysisResult.career_matches.map((c) => (
                  <div key={c.career_id} className="flex items-center justify-between p-2.5 bg-slate-800/60 rounded-lg text-xs">
                    <span className="font-medium text-slate-200">{c.title}</span>
                    <Badge variant="primary">{c.match_score}% Match</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
