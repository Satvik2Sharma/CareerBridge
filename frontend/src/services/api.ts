import {
  UserProfile,
  JobRecommendation,
  SkillGapAnalysis,
  CareerRecommendation,
  LearningRoadmapItem,
  Assessment,
  AssessmentResult,
  BusinessProfile,
  MSMEAnalysis
} from '../types';

const API_BASE = '/api';

export const defaultDemoUser: UserProfile = {
  name: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  career_goal: "Backend Developer",
  experience_years: 0.5,
  education: "B.Tech Computer Science",
  work_preference: "Hybrid",
  skills: ["Python", "Java", "SQL", "React", "Git", "REST APIs"],
  projects: [
    {
      title: "Smart Career Recommendation Engine",
      technologies: ["Python", "FastAPI", "React", "SQL"],
      description: "Built job matching platform with deterministic scoring rules."
    },
    {
      title: "E-Commerce Services",
      technologies: ["Java", "REST APIs", "Git"],
      description: "Designed RESTful catalog microservice with authentication."
    }
  ],
  certifications: ["AWS Cloud Practitioner"],
  readiness_score: 82.0
};

export const defaultDemoBusiness: BusinessProfile = {
  name: "Local Clothing Store",
  business_type: "Clothing Store",
  owner_name: "Rajesh Kumar",
  location: "Roorkee, Uttarakhand",
  employees_count: 3,
  monthly_orders: 250,
  current_tech: ["WhatsApp", "Excel"],
  challenges: ["Inventory tracking", "Customer retention", "Marketing"]
};

export const api = {
  async fetchHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async analyzeResume(formData: FormData) {
    const res = await fetch(`${API_BASE}/resume/analyze`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  async getJobRecommendations(profile: UserProfile): Promise<{ top_recommendations: JobRecommendation[] }> {
    try {
      const res = await fetch(`${API_BASE}/jobs/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      return await res.json();
    } catch {
      // Client-side fallback if backend call fails
      return {
        top_recommendations: [
          {
            job_id: "job-1",
            job_title: "Backend Developer Intern / Junior",
            company: "TechInnovate Solutions",
            overall_match: 89.0,
            breakdown: {
              required_skill_match: 100,
              proficiency_match: 90,
              career_goal_alignment: 100,
              experience_match: 100,
              education_compatibility: 100,
              location_preference: 100,
              profile_evidence: 90
            },
            matched_skills: ["Java", "SQL", "REST APIs", "Git"],
            matched_preferred_skills: [],
            missing_skills: ["Spring Boot", "Docker"],
            explanation: "Exceptional 89% match for Backend Developer! Verified skills in Java, SQL, REST APIs and Git align with key role requirements.",
            job_details: {
              id: "job-1",
              title: "Backend Developer Intern / Junior",
              company: "TechInnovate Solutions",
              location: "Remote / Bengaluru",
              work_type: "Hybrid",
              experience_level: "Fresher / 0-1 years",
              category: "Software Development",
              salary_range: "₹5,00,000 - ₹8,00,000 / year",
              career_id: "car-2",
              required_skills: ["Java", "SQL", "REST APIs", "Git"],
              preferred_skills: ["Spring Boot", "Docker"],
              description: "Build robust microservices using Java and REST APIs."
            }
          }
        ]
      };
    }
  },

  async getSkillGap(jobId: string, skills: string[]): Promise<SkillGapAnalysis> {
    const res = await fetch(`${API_BASE}/jobs/${jobId}/skill-gap?user_skills=${encodeURIComponent(skills.join(','))}`);
    return res.json();
  },

  async getCareerRecommendations(profile: UserProfile): Promise<{ career_recommendations: CareerRecommendation[] }> {
    const res = await fetch(`${API_BASE}/careers/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    return res.json();
  },

  async getPersonalizedRoadmap(profile: UserProfile, careerGoal: string, missingSkills: string[]): Promise<{ roadmap: LearningRoadmapItem[] }> {
    const res = await fetch(`${API_BASE}/learning-paths/personalized`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_profile: profile,
        career_goal: careerGoal,
        target_missing_skills: missingSkills
      }),
    });
    return res.json();
  },

  async getAssessments(): Promise<{ assessments: Assessment[] }> {
    const res = await fetch(`${API_BASE}/assessments`);
    return res.json();
  },

  async submitAssessment(assessmentId: string, userAnswers: Record<string, number>): Promise<AssessmentResult> {
    const res = await fetch(`${API_BASE}/assessments/${assessmentId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assessment_id: assessmentId, user_answers: userAnswers }),
    });
    return res.json();
  },

  async analyzeMSME(business: BusinessProfile): Promise<MSMEAnalysis> {
    const res = await fetch(`${API_BASE}/business/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(business),
    });
    return res.json();
  }
};
