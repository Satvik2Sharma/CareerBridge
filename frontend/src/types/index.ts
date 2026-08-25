export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  career_goal: string;
  experience_years: number;
  education: string;
  work_preference: string;
  skills: string[];
  projects: Array<{
    title: string;
    technologies: string[];
    description: string;
  }>;
  certifications: string[];
  readiness_score: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  work_type: string;
  experience_level: string;
  category: string;
  salary_range: string;
  career_id: string;
  required_skills: string[];
  preferred_skills: string[];
  description: string;
}

export interface MatchBreakdown {
  required_skill_match: number;
  proficiency_match: number;
  career_goal_alignment: number;
  experience_match: number;
  education_compatibility: number;
  location_preference: number;
  profile_evidence: number;
}

export interface JobRecommendation {
  job_id: string;
  job_title: string;
  company: string;
  overall_match: number;
  breakdown: MatchBreakdown;
  matched_skills: string[];
  matched_preferred_skills: string[];
  missing_skills: string[];
  explanation?: string;
  job_details?: Job;
}

export interface SkillState {
  skill: string;
  state: 'Strong' | 'Partial' | 'Missing';
  badge: string;
  current_proficiency: string;
  target_proficiency: string;
  is_required: boolean;
  priority?: 'HIGH' | 'MEDIUM' | 'LOW';
  estimated_effort?: string;
  why_it_matters?: string;
}

export interface SkillGapAnalysis {
  job_id: string;
  job_title: string;
  all_skill_states: SkillState[];
  prioritized_gaps: {
    high: SkillState[];
    medium: SkillState[];
    low: SkillState[];
  };
}

export interface CareerRecommendation {
  career_id: string;
  title: string;
  category: string;
  match_score: number;
  description: string;
  strengths: string[];
  gaps: string[];
  prep_effort_months: string;
  typical_experience: string;
  explanation?: string;
  next_step?: string;
}

export interface LearningRoadmapItem {
  week: number;
  skill: string;
  title: string;
  objective: string;
  duration: string;
  difficulty: string;
  resources: Array<{ title: string; type: string; url: string }>;
  practical_task: string;
  status: 'pending' | 'completed';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_index: number;
}

export interface Assessment {
  id: string;
  skill: string;
  title: string;
  description: string;
  readiness_boost: number;
  questions: Question[];
}

export interface AssessmentResult {
  assessment_id: string;
  skill: string;
  passed: boolean;
  score_percentage: number;
  correct_count: number;
  total_questions: number;
  readiness_boost: number;
  previous_readiness: number;
  new_readiness_score: number;
  unlocked_opportunities: number;
}

export interface BusinessProfile {
  id?: string;
  name: string;
  business_type: string;
  owner_name: string;
  location: string;
  employees_count: number;
  monthly_orders: number;
  current_tech: string[];
  challenges: string[];
}

export interface MSMERecommendation {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  expected_benefit: string;
  effort: 'LOW' | 'MEDIUM' | 'HIGH';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  priority: number;
  cost_category: string;
}

export interface MSMERoadmapPhase {
  month: number;
  phase: string;
  focus: string;
  action_items: string[];
}

export interface MSMEAnalysis {
  business_name: string;
  business_type: string;
  digital_maturity_score: number;
  category_scores: Record<string, number>;
  recommendations: MSMERecommendation[];
  roadmap_90_day: MSMERoadmapPhase[];
}
