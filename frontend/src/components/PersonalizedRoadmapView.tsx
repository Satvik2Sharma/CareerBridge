import React, { useState } from 'react';
import { LearningRoadmapItem } from '../types';
import { BookOpen, CheckCircle, Circle, Play, Award, ShieldCheck } from 'lucide-react';

interface RoadmapProps {
  careerGoal: string;
  userSkills: string[];
  roadmap: LearningRoadmapItem[];
  onCompleteTask: (week: number) => void;
}

export const PersonalizedRoadmapView: React.FC<RoadmapProps> = ({
  careerGoal,
  userSkills,
  roadmap,
  onCompleteTask,
}) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">
            Personalized AI Learning Engine
          </span>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Skips skills you already know ({userSkills.slice(0, 3).join(', ')})
          </span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight mt-1">
          Personalized Learning Roadmap — {careerGoal}
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          This step-by-step path bridges your current skill profile directly to your target career goal.
        </p>
      </div>

      {/* Week-by-Week Timeline */}
      <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-8">
        {roadmap.map((step) => {
          const isCompleted = step.status === 'completed';

          return (
            <div key={step.week} className="relative group">
              {/* Timeline Marker */}
              <div
                className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-slate-900 border-blue-500 text-blue-400'
                }`}
              >
                {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">{step.week}</span>}
              </div>

              <div className="glass-card rounded-xl p-5 border border-slate-800/80 hover:border-slate-700 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-blue-400 tracking-wider">
                      WEEK {step.week} • {step.skill}
                    </span>
                    <h3 className="font-heading font-bold text-base text-white">{step.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                      ⏱ {step.duration}
                    </span>
                    <button
                      onClick={() => onCompleteTask(step.week)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition flex items-center gap-1 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Completed
                        </>
                      ) : (
                        'Mark Completed'
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{step.objective}</p>

                {/* Practical Task Card */}
                <div className="mt-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                  <Play className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-amber-300 uppercase">Practical Milestone Task</span>
                    <p className="text-xs text-slate-300 mt-0.5">{step.practical_task}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
