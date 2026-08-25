from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional

# Auth Schemas
class AuthRegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "candidate" # candidate, msme_owner

class AuthLoginRequest(BaseModel):
    email: str
    password: str

class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    full_name: str
    role: str

# Skill Schemas
class SkillSchema(BaseModel):
    id: str
    name: str
    category: str
    aliases: List[str] = []

# User Schemas
class UserProfileSchema(BaseModel):
    id: Optional[str] = "usr-1"
    name: str = "Aarav Sharma"
    email: str = "aarav.sharma@example.com"
    career_goal: str = "Software Development / Backend"
    experience_years: float = 0.5
    education: str = "B.Tech Computer Science"
    work_preference: str = "Hybrid"
    skills: List[str] = ["Python", "Java", "SQL", "React", "Git", "REST APIs"]
    projects: List[Dict[str, Any]] = []
    certifications: List[str] = []
    readiness_score: float = 82.0

# Job Schemas
class JobSchema(BaseModel):
    id: str
    title: str
    company: str
    location: str
    work_type: str
    experience_level: str
    category: str
    salary_range: str
    career_id: Optional[str] = None
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    description: str
    type: str = "PRIVATE_JOB" # PRIVATE_JOB, GOVERNMENT_JOB, INTERNSHIP, APPRENTICESHIP, GIG
    source: str = "CareerBridge Seed"
    source_url: Optional[str] = None
    verification_status: str = "VERIFIED"

class MatchBreakdownSchema(BaseModel):
    required_skill_match: float
    proficiency_match: float
    career_goal_alignment: float
    experience_match: float
    education_compatibility: float
    location_preference: float
    profile_evidence: float

class JobRecommendationResponse(BaseModel):
    job_id: str
    job_title: str
    company: str
    overall_match: float
    breakdown: MatchBreakdownSchema
    matched_skills: List[str]
    matched_preferred_skills: List[str]
    missing_skills: List[str]
    explanation: Optional[str] = None
    job_details: Optional[JobSchema] = None

# Government Recruitment & Eligibility Schemas
class GovernmentPostSchema(BaseModel):
    id: str
    recruitment_id: str
    post_name: str
    department: Optional[str] = None
    pay_level: Optional[str] = None
    vacancies: int = 1
    education_required: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    age_min: int = 18
    age_max: int = 30
    experience_years_required: int = 0

class GovernmentRecruitmentSchema(BaseModel):
    id: str
    recruiting_body: str # UPSC, SSC, IBPS, RRB
    recruitment_name: str
    notification_number: Optional[str] = None
    notification_url: Optional[str] = None
    official_apply_url: Optional[str] = None
    application_deadline: Optional[str] = None
    total_vacancies: int = 0
    selection_process: Optional[str] = None
    status: str = "ACTIVE"
    posts: List[GovernmentPostSchema] = []

class GovernmentEligibilityRequest(BaseModel):
    age: int = 22
    category: str = "GENERAL" # GENERAL, OBC, SC, ST, EWS, PWD
    degree: str = "B.Tech"
    branch: str = "Computer Science"
    experience_years: float = 0.5
    gender: Optional[str] = "All"

class GovernmentEligibilityResponse(BaseModel):
    status: str # ELIGIBLE, POSSIBLY_ELIGIBLE, NOT_ELIGIBLE
    recruitment_id: str
    post_name: str
    recruiting_body: str
    reasons: List[str]
    official_notification_url: Optional[str] = None

# Skill Gap Schemas
class SkillStateSchema(BaseModel):
    skill: str
    state: str  # Strong, Partial, Missing
    badge: str  # ✓, ~, ✗
    current_proficiency: str
    target_proficiency: str
    is_required: bool
    priority: Optional[str] = None
    estimated_effort: Optional[str] = None
    why_it_matters: Optional[str] = None

class SkillGapResponse(BaseModel):
    job_id: str
    job_title: str
    all_skill_states: List[SkillStateSchema]
    prioritized_gaps: Dict[str, List[SkillStateSchema]]

# Career Schemas
class CareerRecommendationResponse(BaseModel):
    career_id: str
    title: str
    category: str
    match_score: float
    description: str
    strengths: List[str]
    gaps: List[str]
    prep_effort_months: str
    typical_experience: str
    explanation: Optional[str] = None
    next_step: Optional[str] = None

# Learning Roadmap Schemas
class LearningRoadmapItemSchema(BaseModel):
    week: int
    skill: str
    title: str
    objective: str
    duration: str
    difficulty: str
    resources: List[Dict[str, str]]
    practical_task: str
    status: str = "pending"

# Assessment Schemas
class QuestionSchema(BaseModel):
    id: str
    text: str
    options: List[str]
    correct_index: int

class AssessmentSchema(BaseModel):
    id: str
    skill: str
    title: str
    description: str
    readiness_boost: int
    questions: List[QuestionSchema]

class AssessmentSubmitRequest(BaseModel):
    assessment_id: str
    user_answers: Dict[str, int]  # question_id -> option index

class AssessmentSubmitResponse(BaseModel):
    passed: bool
    score_percentage: float
    correct_count: int
    total_questions: int
    readiness_boost: int
    new_readiness_score: float
    unlocked_opportunities: int

# MSME Schemas
class BusinessProfileSchema(BaseModel):
    id: Optional[str] = "biz-1"
    name: str = "Local Clothing Store"
    business_type: str = "Clothing Store"
    owner_name: str = "Rajesh Kumar"
    location: str = "Roorkee, Uttarakhand"
    employees_count: int = 3
    monthly_orders: int = 250
    current_tech: List[str] = ["WhatsApp", "Excel"]
    challenges: List[str] = ["Inventory tracking", "Customer retention", "Marketing"]

class DigitalMaturityResponse(BaseModel):
    business_name: str
    business_type: str
    digital_maturity_score: int
    category_scores: Dict[str, int]
    growth_opportunities: Optional[List[str]] = []

class MSMERecommendationSchema(BaseModel):
    id: str
    title: str
    category: str
    problem: str
    solution: str
    expected_benefit: str
    effort: str
    impact: str
    priority: int
    cost_category: str

class MSMERoadmapPhaseSchema(BaseModel):
    month: int
    phase: str
    focus: str
    action_items: List[str]

class MSMEAnalysisResponse(BaseModel):
    business_name: str
    business_type: str
    digital_maturity_score: int
    category_scores: Dict[str, int]
    recommendations: List[MSMERecommendationSchema]
    roadmap_90_day: List[MSMERoadmapPhaseSchema]
