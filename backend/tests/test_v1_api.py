import pytest
from fastapi.testclient import TestClient
from app.main import app

def test_health_endpoint():
    with TestClient(app) as client:
        res = client.get("/api/health")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "healthy"

def test_v1_skills_endpoint():
    with TestClient(app) as client:
        res = client.get("/api/v1/skills")
        assert res.status_code == 200
        data = res.json()
        assert "skills" in data
        assert isinstance(data["skills"], list)

def test_v1_jobs_endpoint():
    with TestClient(app) as client:
        res = client.get("/api/v1/jobs")
        assert res.status_code == 200
        data = res.json()
        assert "jobs" in data
        assert isinstance(data["jobs"], list)

def test_v1_government_recruitments():
    with TestClient(app) as client:
        res = client.get("/api/v1/government/recruitments")
        assert res.status_code == 200
        data = res.json()
        assert "recruitments" in data
        assert isinstance(data["recruitments"], list)

def test_v1_auth_flow():
    with TestClient(app) as client:
        reg_payload = {
            "email": "test.user@example.com",
            "password": "SecretPassword123",
            "full_name": "Test Candidate",
            "role": "candidate"
        }
        res_reg = client.post("/api/v1/auth/register", json=reg_payload)
        if res_reg.status_code == 200:
            data = res_reg.json()
            assert "access_token" in data
            assert data["email"] == "test.user@example.com"
        
        login_payload = {
            "email": "test.user@example.com",
            "password": "SecretPassword123"
        }
        res_login = client.post("/api/v1/auth/login", json=login_payload)
        assert res_login.status_code == 200
        data_login = res_login.json()
        assert "access_token" in data_login

def test_v1_job_recommendation():
    with TestClient(app) as client:
        profile = {
            "name": "Aarav Sharma",
            "email": "aarav.sharma@example.com",
            "career_goal": "Backend Developer",
            "experience_years": 0.5,
            "education": "B.Tech Computer Science",
            "work_preference": "Hybrid",
            "skills": ["Python", "Java", "SQL", "React", "Git", "REST APIs"],
            "projects": [],
            "certifications": [],
            "readiness_score": 82.0
        }
        res = client.post("/api/v1/jobs/recommend", json=profile)
        assert res.status_code == 200
        data = res.json()
        assert "top_recommendations" in data
        assert isinstance(data["top_recommendations"], list)

def test_v1_msme_assessment():
    with TestClient(app) as client:
        biz_profile = {
            "name": "Local Clothing Store",
            "business_type": "Clothing Store",
            "owner_name": "Rajesh Kumar",
            "location": "Roorkee, Uttarakhand",
            "employees_count": 3,
            "monthly_orders": 250,
            "current_tech": ["WhatsApp", "Excel"],
            "challenges": ["Inventory tracking", "Customer retention", "Marketing"]
        }
        res = client.post("/api/v1/msme/assessment", json=biz_profile)
        assert res.status_code == 200
        data = res.json()
        assert "digital_maturity_score" in data
        assert "recommendations" in data
        assert "roadmap_90_day" in data
