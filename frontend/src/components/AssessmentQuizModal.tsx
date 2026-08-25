import React, { useState } from 'react';
import { Assessment, AssessmentResult } from '../types';
import { X, CheckCircle2, Award, Zap, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

interface QuizProps {
  assessment: Assessment;
  onClose: () => void;
  onSuccess: (result: AssessmentResult) => void;
}

export const AssessmentQuizModal: React.FC<QuizProps> = ({ assessment, onClose, onSuccess }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectOption = (qId: string, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.submitAssessment(assessment.id, selectedAnswers);
      setResult(res);
      onSuccess(res);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-xl w-full rounded-2xl border border-slate-700 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Interactive Assessment
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">{assessment.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!result ? (
          <div className="space-y-6">
            <p className="text-xs text-slate-300">{assessment.description}</p>

            <div className="space-y-6">
              {assessment.questions.map((q, idx) => (
                <div key={q.id} className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-semibold text-white">
                    {idx + 1}. {q.text}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || Object.keys(selectedAnswers).length < assessment.questions.length}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                {submitting ? 'Evaluating Answers...' : 'Submit & Recalculate Readiness'}
              </button>
            </div>
          </div>
        ) : (
          /* Result Card View */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Assessment Passed! ({result.score_percentage}%)
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                You correctly answered {result.correct_count} of {result.total_questions} questions for {result.skill}.
              </p>
            </div>

            {/* Readiness Boost Display */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-blue-500/30 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Readiness Boost</span>
                <span className="text-xl font-extrabold text-emerald-400">+{result.readiness_boost}%</span>
                <span className="block text-[11px] text-slate-300 mt-1">
                  {result.previous_readiness}% → <strong className="text-white">{result.new_readiness_score}%</strong>
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Unlocked Opportunities</span>
                <span className="text-xl font-extrabold text-blue-400">+{result.unlocked_opportunities} Jobs</span>
                <span className="block text-[11px] text-slate-300 mt-1">Directly compatible openings</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <span>Update Career Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
