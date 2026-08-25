import pytest
import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_workflow_1_resume_upload_and_auto_profile_sync():
    """TEST 1: Upload resume PDF, extract text, auto-sync profile to database & return career matches"""
    sample_pdf_text = b"%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<< /Root 1 0 R >>\n%%EOF"
    response = client.post(
        "/api/v1/resume/analyze",
        files={"file": ("aarav_sharma_resume.pdf", sample_pdf_text, "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "detected_skills" in data
    assert len(data["career_matches"]) > 0

def test_workflow_2_job_search_and_matching_engine():
    """TEST 2: Search jobs, get recommendation with 5-factor match score & skill breakdown"""
    # 1. Fetch Jobs
    res_jobs = client.get("/api/v1/jobs")
    assert res_jobs.status_code == 200
    jobs_data = res_jobs.json()
    assert "jobs" in jobs_data
    assert len(jobs_data["jobs"]) > 0

    # 2. Get Match Recommendations
    user_profile = {
        "user_id": "demo-aarav",
        "name": "Aarav Sharma",
        "email": "aarav.sharma@example.com",
        "career_goal": "Full Stack Engineer",
        "experience_years": 1.0,
        "education": "B.Tech Computer Science",
        "work_preference": "Hybrid",
        "skills": ["Python", "Java", "SQL", "React", "Git", "REST APIs"]
    }
    res_recs = client.post("/api/v1/jobs/recommend", json=user_profile)
    assert res_recs.status_code == 200
    recs_data = res_recs.json()
    assert "top_recommendations" in recs_data
    top_rec = recs_data["top_recommendations"][0]
    assert "overall_match" in top_rec
    assert "breakdown" in top_rec

def test_workflow_3_government_jobs_and_eligibility_engine():
    """TEST 3: Check UPSC/SSC government recruitment eligibility with category age relaxation rules"""
    # Age 32, OBC category (+3 yrs relaxation -> effective limit 33 -> Eligible)
    payload = {
        "age": 32,
        "degree": "B.Tech",
        "branch": "Computer Science",
        "category": "OBC",
        "experience_years": 2.0
    }
    res = client.post("/api/v1/government/eligibility?post_id=post-101", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] in ["ELIGIBLE", "POSSIBLY_ELIGIBLE"]
    assert "recruiting_body" in data

def test_workflow_4_career_explorer_skill_gap_and_roadmap():
    """TEST 4: Skill gap analysis and personalized roadmap generation"""
    # 1. Skill Gap Analysis
    res_gap = client.post("/api/v1/skill-gap/analyze?job_id=job-101", json=["Python", "SQL", "Git"])
    assert res_gap.status_code == 200
    data_gap = res_gap.json()
    assert "all_skill_states" in data_gap
    assert "prioritized_gaps" in data_gap

    # 2. Roadmap Generation
    payload_road = {
        "user_profile": {
            "name": "Aarav Sharma",
            "skills": ["Python", "SQL"]
        },
        "career_goal": "Backend Developer"
    }
    res_road = client.post("/api/v1/roadmaps/personalized", json=payload_road)
    assert res_road.status_code == 200
    data_road = res_road.json()
    assert "roadmap" in data_road
    assert len(data_road["roadmap"]) > 0

def test_workflow_5_skill_assessment_submission():
    """TEST 5: Submit assessment answers, calculate score & readiness score boost"""
    payload_quiz = {
        "assessment_id": "quiz-spring-boot",
        "user_answers": {"q1": 1, "q2": 0, "q3": 1}
    }
    res = client.post("/api/v1/assessments/quiz-spring-boot/submit", json=payload_quiz)
    assert res.status_code == 200
    data = res.json()
    assert data["passed"] is True
    assert "new_readiness_score" in data

def test_workflow_6_msme_digital_maturity_and_growth_roadmap():
    """TEST 6: Business profile evaluation, digital maturity score (0-100) & recommendations"""
    business_payload = {
        "name": "Roorkee Apparel Store",
        "business_type": "Retail Clothing Store",
        "employees_count": 4,
        "monthly_orders": 250,
        "current_tech": ["Excel", "WhatsApp", "Cash Billing"],
        "challenges": ["Stock tracking out-of-sync", "Manual paper receipts"]
    }
    res = client.post("/api/v1/msme/assessment", json=business_payload)
    assert res.status_code == 200
    data = res.json()
    assert "digital_maturity_score" in data
    assert "category_scores" in data
    assert data["digital_maturity_score"] > 0
