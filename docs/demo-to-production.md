# CareerBridge — Demo to Production Mapping Document

This document tracks every major system feature, detailing its current state, production implementation, target API endpoint, underlying database models, and current completion status.

---

| Feature | Current State | Production Implementation | Target API Endpoint | Database Tables / Models | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Resume Upload & AI Parsing** | PDF text extraction via `pypdf` + `MockAIProvider` | Real PDF/DOCX text parsing, skill normalization, structured Pydantic validation, and auto-sync into DB profile | `POST /api/v1/resume/analyze` | `users`, `user_profiles`, `user_skills` | **IMPLEMENTED** |
| **Candidate Profile Persistence** | Profile state kept in React local state & API mock fallback | Direct CRUD operations against SQLAlchemy `UserProfile` & `UserSkill` ORM models | `GET /api/v1/profile`, `PUT /api/v1/profile` | `users`, `user_profiles`, `user_skills` | **IMPLEMENTED** |
| **Job Search & Filters** | Filtered via local array in frontend component | Server-side SQL filtering with pagination, location, work type, and category filters | `GET /api/v1/jobs` | `opportunities`, `opportunity_skills`, `organizations` | **IMPLEMENTED** |
| **Deterministic Job Match Engine** | 5-factor scoring engine (Skill 35%, Proficiency 20%, Goal 20%, Experience 15%, Location 10%) | Dynamic calculation comparing candidate DB profile against opportunity DB requirements | `POST /api/v1/jobs/recommend` | `opportunities`, `user_profiles`, `skills` | **IMPLEMENTED** |
| **Government Recruitment & Eligibility** | Rule evaluator for category age relaxations (OBC +3, SC/ST +5, PWD +10) | Structured DB rules evaluation against `GovernmentPost` and `GovernmentEligibilityRule` | `POST /api/v1/government/jobs/{id}/eligibility` | `government_recruitments`, `government_posts` | **IMPLEMENTED** |
| **Career Fit Explorer & Comparison** | Career taxonomy fit calculation | DB query matching user skills against `CareerSkill` requirements with prep effort estimates | `POST /api/v1/careers/recommend` | `careers`, `career_skills` | **IMPLEMENTED** |
| **Skill Gap Engine & Roadmap** | 3-state skill status (`✓ Strong`, `◐ Partial`, `○ Missing Gap`) | Dynamic skill gap resolution omitting already-mastered skills from learning timeline | `POST /api/v1/skill-gap/analyze`, `GET /api/v1/roadmaps/{career_id}` | `skills`, `learning_resources`, `user_skills` | **IMPLEMENTED** |
| **Skill Assessment Quizzes** | Interactive quiz modal with score boost calculations | Server-side score evaluation, result persistence, and automatic candidate profile skill boost | `GET /api/v1/assessments`, `POST /api/v1/assessments/{id}/submit` | `assessments`, `assessment_questions`, `user_assessment_results` | **IMPLEMENTED** |
| **MSME Digital Maturity Diagnostic** | 0–100 maturity score evaluation across 6 categories | Structured scoring engine evaluating enterprise tech stack, persistence to DB | `POST /api/v1/msme/assessment` | `business_profiles`, `digital_maturity_assessments` | **IMPLEMENTED** |
| **MSME Recommendations & Roadmap** | Low-cost tech recommendations and 90-day growth blueprint | Prioritized tech catalog queries and 30/60/90 day structured action items | `GET /api/v1/msme/roadmap` | `business_recommendations` | **IMPLEMENTED** |

---

## Verification & Deployment Summary
- **Database Engine**: SQLAlchemy 2.0 Async ORM with `AsyncSession` support for both SQLite (`sqlite+aiosqlite`) and PostgreSQL (`postgresql+asyncpg`).
- **Data Ingestion**: Idempotent seeding from `data/*.json` and real-world adapters (`NCSAdapter`, `GovernmentBulletinAdapter`, `AdzunaAdapter`).
- **Frontend Sync**: React Router v6 frontend connected via `services/api/` client layer to backend `/api/v1/` REST endpoints.
