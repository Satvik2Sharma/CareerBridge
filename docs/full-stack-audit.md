# CareerBridge — Full-Stack Repository Audit & Production Gap Analysis

**Project**: CareerBridge — AI-Powered Career & Business Intelligence Platform  
**Hackathon**: HACKN'TECH 10.0 — Theme 8: Future of Work (Technology for Employment & Entrepreneurship)  
**Audit Date**: August 2026  

---

## 1. Executive Summary

This document presents a comprehensive, component-by-component full-stack audit of the **CareerBridge** repository (`Satvik2Sharma/CareerBridge`). It evaluates current architecture, database status, frontend components, API endpoints, backend services, schema definitions, data ingestion pipelines, and security controls to formulate an incremental production deployment roadmap.

---

## 2. Component Audits

### 2.1 Existing Frontend (`frontend/src/`)
- **Framework & Bundler**: React 18.3, TypeScript 5.5, Vite 5.4, React Router v6.
- **Styling & UI**: Tailwind CSS v3, Lucide React Icons, custom dark-mode glassmorphic components (`Button`, `Card`, `Badge`, `Skeleton`, `Input`, `StatCard`).
- **Pages**:
  - `LandingPage.tsx` (Hero, Stats counter, Feature pillars, FAQ)
  - `CareerDashboard.tsx` & `MSMEDashboard.tsx` (Domain dashboards)
  - `JobDiscoveryPage.tsx` & `JobDetailsPage.tsx` (Search, match score, detailed breakdown)
  - `GovernmentJobsPage.tsx` (UPSC/SSC bulletins, category age relaxation eligibility checker)
  - `CareerExplorerPage.tsx` & `CareerComparisonPage.tsx` (Career matrix & side-by-side comparison)
  - `SkillGapPage.tsx` & `RoadmapPage.tsx` (3-state skill analysis, personalized learning steps)
  - `AssessmentsPage.tsx` & `AssessmentQuizModal.tsx` (Interactive verification quizzes)
  - `ResumePage.tsx` (PDF/DOCX uploader & AI parser UI)
  - `ProfilePage.tsx` & `BusinessProfilePage.tsx` (Candidate & MSME profiles)
  - `MSMEAssessmentPage.tsx`, `MSMERecommendationsPage.tsx`, `MSMERoadmapPage.tsx` (Maturity scoring & 90-day growth roadmap)
- **Status**: Visual design complete with React Router integration. UI client currently defaults to `mockData` fallback when backend is unreachable or when `VITE_USE_MOCK_API=true`.

### 2.2 Existing Backend (`backend/app/`)
- **Framework**: Python 3.12, FastAPI, Pydantic v2.
- **Routing Structure**:
  - Versioned API (`/api/v1/`): `auth`, `skills`, `jobs`, `careers`, `resume`, `government`, `roadmaps`, `skill_gap`, `assessments`, `msme`, `ingestion`.
  - Legacy Routers (`/api/`): `health`, `skills`, `jobs`, `careers`, `resume`, `learning`, `assessments`, `readiness`, `business`.
- **Status**: Endpoints exist for major routes, returning SQLite ORM records or mock responses. Needs full database synchronization and persistence on resume upload.

### 2.3 Existing Database & ORM (`backend/app/models/` & `alembic/`)
- **ORM**: SQLAlchemy 2.0 Async ORM with `AsyncSession` (`sqlite+aiosqlite` and `postgresql+asyncpg` drivers).
- **Models**:
  - `User`, `UserProfile`, `UserSkill`
  - `Skill`, `SkillAlias`
  - `Career`, `CareerSkill`
  - `Organization`, `Opportunity`, `OpportunitySkill`
  - `GovernmentRecruitment`, `GovernmentPost`, `GovernmentEligibilityRule`
  - `LearningResource`, `Assessment`, `AssessmentQuestion`, `UserAssessmentResult`
  - `BusinessProfile`, `DigitalMaturityAssessment`, `BusinessRecommendation`
- **Migrations**: Alembic setup present (`alembic/versions/`).
- **Vector Support**: `pgvector` abstraction (`Vector(1536)` / JSON fallback for SQLite).

### 2.4 Data & Ingestion Pipelines (`data/` & `backend/app/services/ingestion/`)
- **Source Files**: `skills.json`, `careers.json`, `jobs.json`, `learning_resources.json`, `assessments.json`, `business_recommendations.json`.
- **Adapters**: `NCSAdapter`, `GovernmentBulletinAdapter`, `AdzunaAdapter` in `backend/app/services/ingestion/`.
- **Pipeline**: `ingestion_pipeline.ingest_all()` parses JSON files and adapters, extracts embeddings, and seeds DB records.

---

## 3. Production Gaps & Technical Debt

| Area | Current State | Production Target | Status |
| :--- | :--- | :--- | :--- |
| **Resume Extraction** | Parser extracts text via `pypdf`, passes to `MockAIProvider` | Save extracted profile directly to `users` & `user_profiles` DB tables; auto-sync frontend state | Needs DB Persistence Sync |
| **Database Persistence** | Ingestion populates SQLite/Postgres DB on startup | Ensure all endpoints (skills, jobs, user profile, quiz submissions, MSME scores) read/write directly to DB | Needs Persistence Audit |
| **Matching Engine** | Hybrid calculation (Skill 35%, Proficiency 20%, Goal 20%, Experience 15%, Location 10%) | Fully wired to DB `Opportunity` and `Skill` models with real DB query filters | Verified Engine, Needs Search Wiring |
| **pgvector / Embeddings** | Vector column in models with mock/OpenAI embedding provider | Full cosine similarity search in Postgres via `pgvector` | Active |
| **Government Eligibility** | Category age relaxation rules evaluator (OBC, SC, ST, PWD) | Connected to `GovernmentPost` and `GovernmentEligibilityRule` DB models | Verified |

---

## 4. Proposed Incremental Implementation Plan

1. **Phase 1**: Database & Model Synchronization — Audit all SQLAlchemy models, ensure `AsyncSession` CRUD persistence for profiles, assessments, and MSME submissions.
2. **Phase 2**: Resume Upload & Automated Profile Sync — Ensure uploaded PDF/DOCX resumes automatically update user skills, education, and experience in PostgreSQL and trigger immediate frontend reactivity.
3. **Phase 3**: End-to-End API Integration — Confirm all frontend service calls (`services/api/`) communicate with backend `/api/v1/` endpoints.
4. **Phase 4**: Automated Verification & Integration Testing — Implement pytest integration suites for user onboarding, resume parsing, job matching, government eligibility, assessment submission, and MSME maturity diagnostics.
5. **Phase 5**: Production Build & Documentation — Verify `npx tsc --noEmit` and `npm run build`, produce `docs/demo-to-production.md`, and confirm Docker/server runner commands.
