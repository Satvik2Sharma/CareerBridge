import React, { useState, useEffect } from 'react';
import { CheckSquare, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AssessmentQuizModal } from '../components/AssessmentQuizModal';
import { apiService } from '../services/api';
import { Assessment } from '../types';

export const AssessmentsPage: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);

  useEffect(() => {
    async function loadQuizzes() {
      const res = await apiService.getAssessments();
      setAssessments(res.assessments);
    }
    loadQuizzes();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Skill Assessments & Verification Quizzes</h1>
        <p className="text-xs text-slate-400">Take 5-minute technical quizzes to verify your skills and boost your overall career readiness score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((quiz) => (
          <Card key={quiz.id} hoverEffect className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="primary">{quiz.skill}</Badge>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{quiz.title}</h3>
              </div>
              <Badge variant="success">+{quiz.readiness_boost}% Score Boost</Badge>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{quiz.description}</p>
            <p className="text-[11px] text-slate-400">{quiz.questions.length} Multiple Choice Questions</p>

            <Button
              variant="primary"
              size="sm"
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setActiveQuiz(quiz)}
            >
              Start Skill Assessment
            </Button>
          </Card>
        ))}
      </div>

      {activeQuiz && (
        <AssessmentQuizModal
          assessment={activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onComplete={() => setActiveQuiz(null)}
        />
      )}
    </div>
  );
};
