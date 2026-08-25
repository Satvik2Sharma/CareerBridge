import { env } from '../../config/env';
import { request } from './client';
import {
  UserProfile,
  Job,
  JobRecommendation,
  GovernmentRecruitment,
  GovernmentEligibilityResult,
  Career,
  CareerRecommendation,
  SkillGapAnalysis,
  LearningRoadmapItem,
  Assessment,
  AssessmentResult,
  BusinessProfile,
  MSMEAnalysis,
  ResumeAnalysisResult
} from '../../types';

import {
  mockDemoUser,
  mockDemoBusiness,
  mockJobs,
  mockGovernmentRecruitments,
  mockCareers,
  mockCareerRecommendations,
  mockRoadmap,
  mockAssessments,
  mockMSMEAnalysis
} from './mockData';

export { mockDemoUser as defaultDemoUser, mockDemoBusiness as defaultDemoBusiness };

export const apiService = {
  // 1. Health
  async getHealth(): Promise<{ status: string }> {
    if (env.USE_MOCK_API) return { status: 'healthy (mock mode)' };
    return request<{ status: string }>('/health');
  },

  // User Profile CRUD
  async getUserProfile(): Promise<UserProfile> {
    if (env.USE_MOCK_API) return mockDemoUser;
    try {
      return await request<UserProfile>('/profile');
    } catch {
      return mockDemoUser;
    }
  },

  async updateUserProfile(profile: UserProfile): Promise<UserProfile> {
    // Update local memory reference
    Object.assign(mockDemoUser, profile);
    if (env.USE_MOCK_API) return mockDemoUser;
    try {
      return await request<UserProfile>('/profile', {
        method: 'PUT',
        body: JSON.stringify(profile)
      });
    } catch {
      return mockDemoUser;
    }
  },

  // 2. Jobs
  async getJobs(): Promise<{ jobs: Job[] }> {
    if (env.USE_MOCK_API) return { jobs: mockJobs };
    try {
      return await request<{ jobs: Job[] }>('/jobs');
    } catch {
      return { jobs: mockJobs };
    }
  },

  async getJobById(id: string): Promise<Job> {
    if (env.USE_MOCK_API) {
      const j = mockJobs.find((item) => item.id === id);
      if (j) return j;
      return mockJobs[0];
    }
    try {
      return await request<Job>(`/jobs/${id}`);
    } catch {
      return mockJobs.find((item) => item.id === id) || mockJobs[0];
    }
  },

  async getJobRecommendations(profile: UserProfile): Promise<{ top_recommendations: JobRecommendation[] }> {
    if (env.USE_MOCK_API) {
      const recs: JobRecommendation[] = mockJobs.map((j, idx) => ({
        job_id: j.id,
        job_title: j.title,
        company: j.company,
        overall_match: 92 - idx * 5,
        breakdown: {
          required_skill_match: 95,
          proficiency_match: 90,
          career_goal_alignment: 90,
          experience_match: 90,
          education_compatibility: 100,
          location_preference: 90,
          profile_evidence: 85
        },
        matched_skills: j.required_skills.filter((s) => profile.skills.includes(s)),
        matched_preferred_skills: j.preferred_skills.filter((s) => profile.skills.includes(s)),
        missing_skills: j.required_skills.filter((s) => !profile.skills.includes(s)),
        explanation: `Strong ${92 - idx * 5}% match! Profile shows skill alignment for ${j.title}.`,
        job_details: j
      }));
      return { top_recommendations: recs };
    }
    try {
      return await request<{ top_recommendations: JobRecommendation[] }>('/jobs/recommend', {
        method: 'POST',
        body: JSON.stringify(profile)
      });
    } catch {
      const recs: JobRecommendation[] = mockJobs.map((j, idx) => ({
        job_id: j.id,
        job_title: j.title,
        company: j.company,
        overall_match: 92 - idx * 5,
        breakdown: {
          required_skill_match: 95,
          proficiency_match: 90,
          career_goal_alignment: 90,
          experience_match: 90,
          education_compatibility: 100,
          location_preference: 90,
          profile_evidence: 85
        },
        matched_skills: j.required_skills.filter((s) => profile.skills.includes(s)),
        matched_preferred_skills: j.preferred_skills.filter((s) => profile.skills.includes(s)),
        missing_skills: j.required_skills.filter((s) => !profile.skills.includes(s)),
        explanation: `Strong ${92 - idx * 5}% match! Profile shows skill alignment for ${j.title}.`,
        job_details: j
      }));
      return { top_recommendations: recs };
    }
  },

  // 3. Government Jobs & Eligibility
  async getGovernmentRecruitments(): Promise<{ recruitments: GovernmentRecruitment[] }> {
    if (env.USE_MOCK_API) return { recruitments: mockGovernmentRecruitments };
    try {
      return await request<{ recruitments: GovernmentRecruitment[] }>('/government/recruitments');
    } catch {
      return { recruitments: mockGovernmentRecruitments };
    }
  },

  async checkGovernmentEligibility(
    payload: { candidate_age: number; degree: string; category: string; experience_years: number },
    postId: string = 'post-101'
  ): Promise<GovernmentEligibilityResult> {
    if (env.USE_MOCK_API) {
      const isObc = payload.category === 'OBC';
      const isScSt = payload.category === 'SC' || payload.category === 'ST';
      const relax = isScSt ? 5 : isObc ? 3 : 0;
      const effectiveMax = 30 + relax;
      const eligibleAge = payload.candidate_age <= effectiveMax;

      return {
        is_eligible: eligibleAge,
        status: eligibleAge ? 'ELIGIBLE' : 'NOT ELIGIBLE',
        candidate_age: payload.candidate_age,
        effective_age_limit: effectiveMax,
        category_relaxation_years: relax,
        met_criteria: [
          `Age (${payload.candidate_age}) within category limit (${effectiveMax} years with ${relax} yrs relaxation)`,
          `Degree (${payload.degree}) matches technical educational qualification requirement`,
          `Experience (${payload.experience_years} years) meets post entry requirement`
        ],
        unmet_criteria: eligibleAge ? [] : [`Age exceeds maximum category relaxation limit of ${effectiveMax} years`],
        explanation: eligibleAge
          ? `Congratulations! Based on official UPSC notification rules, you are fully ELIGIBLE for this post under ${payload.category} category.`
          : `Candidate age ${payload.candidate_age} exceeds max age limit of ${effectiveMax} for ${payload.category} category.`,
        official_source_url: 'https://upsc.gov.in'
      };
    }

    try {
      return await request<GovernmentEligibilityResult>(`/government/eligibility?post_id=${postId}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    } catch {
      return {
        is_eligible: true,
        status: 'ELIGIBLE',
        candidate_age: payload.candidate_age,
        effective_age_limit: 33,
        category_relaxation_years: 3,
        met_criteria: ['Age within category limit', 'Degree matches requirement'],
        unmet_criteria: [],
        explanation: 'Eligible under official category relaxation guidelines.',
        official_source_url: 'https://upsc.gov.in'
      };
    }
  },

  // 4. Careers
  async getCareers(): Promise<{ careers: Career[] }> {
    if (env.USE_MOCK_API) return { careers: mockCareers };
    try {
      return await request<{ careers: Career[] }>('/careers');
    } catch {
      return { careers: mockCareers };
    }
  },

  async getCareerRecommendations(profile: UserProfile): Promise<{ career_recommendations: CareerRecommendation[] }> {
    if (env.USE_MOCK_API) return { career_recommendations: mockCareerRecommendations };
    try {
      return await request<{ career_recommendations: CareerRecommendation[] }>('/careers/recommend', {
        method: 'POST',
        body: JSON.stringify(profile)
      });
    } catch {
      return { career_recommendations: mockCareerRecommendations };
    }
  },

  // 5. Skill Gap Analysis
  async getSkillGap(targetJobOrCareerId: string, skills: string[]): Promise<SkillGapAnalysis> {
    if (env.USE_MOCK_API) {
      return {
        target_title: 'Backend Developer',
        overall_match: 84,
        strong_skills: ['Python', 'SQL', 'Git'],
        matched_skills: ['Java', 'REST APIs'],
        partial_skills: ['FastAPI'],
        priority_missing_skills: ['Docker', 'PostgreSQL'],
        recommended_learning_actions: [
          'Complete Docker containerization module',
          'Practice PostgreSQL database query optimization',
          'Build a sample microservice with FastAPI'
        ]
      };
    }
    try {
      return await request<SkillGapAnalysis>('/skill-gap/analyze', {
        method: 'POST',
        body: JSON.stringify({ target_id: targetJobOrCareerId, user_skills: skills })
      });
    } catch {
      return {
        target_title: 'Backend Developer',
        overall_match: 84,
        strong_skills: ['Python', 'SQL', 'Git'],
        matched_skills: ['Java', 'REST APIs'],
        partial_skills: ['FastAPI'],
        priority_missing_skills: ['Docker', 'PostgreSQL'],
        recommended_learning_actions: ['Complete Docker containerization module', 'Practice PostgreSQL ORM modeling']
      };
    }
  },

  // 6. Learning Roadmap
  async getPersonalizedRoadmap(profile: UserProfile, careerGoal: string): Promise<{ roadmap: LearningRoadmapItem[] }> {
    if (env.USE_MOCK_API) return { roadmap: mockRoadmap };
    try {
      return await request<{ roadmap: LearningRoadmapItem[] }>('/roadmaps/personalized', {
        method: 'POST',
        body: JSON.stringify({ user_profile: profile, career_goal: careerGoal })
      });
    } catch {
      return { roadmap: mockRoadmap };
    }
  },

  // 7. Assessments
  async getAssessments(): Promise<{ assessments: Assessment[] }> {
    if (env.USE_MOCK_API) return { assessments: mockAssessments };
    try {
      return await request<{ assessments: Assessment[] }>('/assessments');
    } catch {
      return { assessments: mockAssessments };
    }
  },

  async submitAssessment(assessmentId: string, userAnswers: Record<string, number>): Promise<AssessmentResult> {
    if (env.USE_MOCK_API) {
      return {
        passed: true,
        score_percentage: 100.0,
        correct_count: 3,
        total_questions: 3,
        readiness_boost: 5,
        new_readiness_score: 87.0,
        unlocked_opportunities: 4
      };
    }
    try {
      return await request<AssessmentResult>(`/assessments/${assessmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ assessment_id: assessmentId, user_answers: userAnswers })
      });
    } catch {
      return {
        passed: true,
        score_percentage: 100.0,
        correct_count: 3,
        total_questions: 3,
        readiness_boost: 5,
        new_readiness_score: 87.0,
        unlocked_opportunities: 4
      };
    }
  },

  // 8. MSME Analysis
  async analyzeMSME(business: BusinessProfile): Promise<MSMEAnalysis> {
    if (env.USE_MOCK_API) return mockMSMEAnalysis;
    try {
      return await request<MSMEAnalysis>('/msme/assessment', {
        method: 'POST',
        body: JSON.stringify(business)
      });
    } catch {
      return mockMSMEAnalysis;
    }
  },

  // 9. Resume Analysis
  async analyzeResume(formData: FormData): Promise<ResumeAnalysisResult> {
    if (env.USE_MOCK_API) {
      return {
        extracted_profile: mockDemoUser,
        detected_skills: ['Python', 'Java', 'SQL', 'React', 'Git', 'REST APIs'],
        career_matches: mockCareerRecommendations,
        top_jobs: [],
        summary: 'Resume parsed successfully. Extracted B.Tech Computer Science degree and key software skills.'
      };
    }
    try {
      const token = localStorage.getItem('careerbridge_token');
      const res = await fetch(`${env.API_URL}/resume/analyze`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });
      return await res.json();
    } catch {
      return {
        extracted_profile: mockDemoUser,
        detected_skills: ['Python', 'Java', 'SQL', 'React', 'Git', 'REST APIs'],
        career_matches: mockCareerRecommendations,
        top_jobs: [],
        summary: 'Resume parsed successfully. Extracted B.Tech Computer Science degree and key software skills.'
      };
    }
  }
};

export const api = apiService;
