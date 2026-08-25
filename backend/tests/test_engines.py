import pytest
from app.services.matching.scoring_engine import JobMatchingEngine
from app.services.skill_gap.gap_analyzer import SkillGapEngine
from app.services.careers.career_engine import CareerMatchingEngine
from app.services.business.msme_engine import MSMEEngine
from app.services.government.eligibility_engine import GovernmentEligibilityEngine
from app.schemas.careerbridge import GovernmentEligibilityRequest
from app.services.embedding.mock_provider import MockEmbeddingProvider
from app.utils.skill_normalizer import skill_normalizer

def test_skill_normalization():
    assert skill_normalizer.normalize("python3") == "Python"
    assert skill_normalizer.normalize("js") == "JavaScript"
    assert skill_normalizer.normalize("reactjs") == "React"

def test_job_matching_engine():
    engine = JobMatchingEngine()
    user_profile = {
        "skills": ["Python", "Java", "SQL", "React", "Git", "REST APIs"],
        "experience_years": 1.0,
        "education": "B.Tech Computer Science",
        "career_goal": "Backend Developer"
    }
    job = {
        "id": "test-job-1",
        "title": "Backend Developer",
        "category": "Software Development",
        "required_skills": ["Java", "SQL", "REST APIs", "Git"],
        "preferred_skills": ["Spring Boot", "Docker"],
        "experience_level": "0-2 years",
        "work_type": "Hybrid"
    }
    
    res = engine.calculate_match(user_profile, job)
    assert res["overall_match"] > 75.0
    assert "Java" in res["matched_skills"]
    assert "Spring Boot" not in res["matched_preferred_skills"]

def test_skill_gap_engine():
    gap_engine = SkillGapEngine()
    user_skills = ["Python", "SQL", "React"]
    job = {
        "id": "job-da",
        "title": "Data Analyst",
        "required_skills": ["Python", "SQL", "Statistics", "Pandas"],
        "preferred_skills": ["Tableau"]
    }
    
    analysis = gap_engine.analyze_gap(user_skills, job)
    skill_map = {s["skill"]: s["state"] for s in analysis["all_skill_states"]}
    
    assert skill_map["Python"] == "Strong"
    assert skill_map["SQL"] == "Strong"
    assert skill_map["Statistics"] == "Missing"

def test_career_matching_engine():
    careers = [
        {"id": "car-1", "title": "Full Stack Developer", "required_skills": ["JavaScript", "React", "Node.js", "SQL", "Git"], "preferred_skills": []},
        {"id": "car-2", "title": "Data Analyst", "required_skills": ["Python", "SQL", "Statistics", "Pandas"], "preferred_skills": []}
    ]
    engine = CareerMatchingEngine(careers)
    user_profile = {"skills": ["JavaScript", "React", "Node.js", "SQL", "Git"]}
    
    results = engine.evaluate_career_fit(user_profile)
    assert results[0]["title"] == "Full Stack Developer"
    assert results[0]["match_score"] > 80.0

def test_msme_digital_maturity():
    engine = MSMEEngine()
    biz = {
        "name": "Local Clothing Store",
        "business_type": "Clothing Store",
        "current_tech": ["WhatsApp", "Excel"],
        "challenges": ["Inventory tracking", "Marketing"]
    }
    res = engine.evaluate_business(biz)
    assert "digital_maturity_score" in res
    assert res["category_scores"]["Payments"] == 30
    assert len(res["recommendations"]) > 0
    assert len(res["roadmap_90_day"]) == 3

def test_government_eligibility_engine():
    engine = GovernmentEligibilityEngine()
    candidate = GovernmentEligibilityRequest(
        age=24,
        category="OBC",
        degree="B.Tech",
        branch="Computer Science",
        experience_years=1.0
    )
    post_details = {
        "post_name": "Assistant Section Officer (IT)",
        "degree": "B.Tech",
        "age_min": 18,
        "age_max": 30,
        "experience_years_required": 0
    }
    recruitment_details = {
        "id": "rec-meity",
        "recruiting_body": "MeitY",
        "notification_url": "https://meity.gov.in"
    }
    res = engine.evaluate_eligibility(candidate, post_details, recruitment_details)
    assert res.status == "ELIGIBLE"
    assert len(res.reasons) > 0

@pytest.mark.asyncio
async def test_mock_embedding_provider():
    provider = MockEmbeddingProvider(dimensions=1536)
    vec1 = await provider.get_embedding("Python Developer Backend")
    vec2 = await provider.get_embedding("Python Developer Backend")
    assert len(vec1) == 1536
    assert vec1 == vec2 # Deterministic check
