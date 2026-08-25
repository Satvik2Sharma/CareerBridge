export type Role = 'candidate' | 'recruiter' | 'admin' | 'msme_owner';

export interface UserProject {
  title: string;
  technologies: string[];
  description: string;
  repo_url?: string;
  live_url?: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  career_goal: string;
  experience_years: number;
  education: string;
  work_preference: 'Remote' | 'Hybrid' | 'Onsite' | string;
  skills: string[];
  projects: UserProject[];
  certifications: string[];
  readiness_score: number;
  phone?: string;
  location?: string;
  bio?: string;
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
  type?: string;
  source?: string;
  source_url?: string;
  verification_status?: string;
  published_at?: string;
  deadline?: string;
}

export interface ScoreBreakdown {
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
  breakdown: ScoreBreakdown;
  matched_skills: string[];
  matched_preferred_skills: string[];
  missing_skills: string[];
  explanation: string;
  job_details: Job;
}

export interface GovernmentPost {
  id: string;
  recruitment_id: string;
  post_name: string;
  department?: string;
  pay_level?: string;
  vacancies?: number;
  education_required?: string;
  degree?: string;
  branch?: string;
  age_min?: number;
  age_max?: number;
  experience_years_required?: number;
}

export interface GovernmentRecruitment {
  id: string;
  recruiting_body: string;
  recruitment_name: string;
  notification_number?: string;
  notification_url?: string;
  official_apply_url?: string;
  total_vacancies: number;
  selection_process?: string;
  status: string;
  posts: GovernmentPost[];
}

export interface GovernmentEligibilityResult {
  is_eligible: boolean;
  status: 'ELIGIBLE' | 'POSSIBLY ELIGIBLE' | 'NOT ELIGIBLE' | 'UNKNOWN';
  candidate_age: number;
  effective_age_limit: number;
  category_relaxation_years: number;
  met_criteria: string[];
  unmet_criteria: string[];
  explanation: string;
  official_source_url?: string;
}

export interface Career {
  id: string;
  title: string;
  category: string;
  description: string;
  required_skills: string[];
  preferred_skills: string[];
  education_expectations?: string;
  typical_experience?: string;
  prep_effort_months?: string;
  opportunity_demand?: string;
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

export interface SkillGapAnalysis {
  target_job_id?: string;
  target_career_id?: string;
  target_title: string;
  overall_match: number;
  strong_skills: string[];
  matched_skills: string[];
  partial_skills: string[];
  priority_missing_skills: string[];
  recommended_learning_actions: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  type: string;
  provider: string;
  duration: string;
  url: string;
  difficulty?: string;
}

export interface LearningRoadmapItem {
  step: number;
  skill: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED' | string;
  resources: LearningResource[];
  estimated_weeks?: number;
}

export interface AssessmentQuestion {
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
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  passed: boolean;
  score_percentage: number;
  correct_count: number;
  total_questions: number;
  readiness_boost: number;
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
  digital_payments?: boolean;
  online_presence?: boolean;
  inventory_system?: boolean;
}

export interface BusinessRecommendation {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  expected_benefit: string;
  effort: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  impact: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  priority: number;
  cost_category?: string;
}

export interface MSMEAnalysis {
  digital_maturity_score: number;
  maturity_level: string;
  category_scores: Record<string, number>;
  key_bottlenecks: string[];
  recommendations: BusinessRecommendation[];
  roadmap_90_day: {
    phase_1_days_1_30: string[];
    phase_2_days_31_60: string[];
    phase_3_days_61_90: string[];
  };
}

export interface ResumeAnalysisResult {
  extracted_profile: Partial<UserProfile>;
  detected_skills: string[];
  career_matches: CareerRecommendation[];
  top_jobs: JobRecommendation[];
  summary: string;
}

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };
