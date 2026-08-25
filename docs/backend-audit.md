# CareerBridge Backend Audit & Production Architecture

> **COER University Hackathon 10.0 (2026) — Theme 8: Future of Work (Technology for Employment & Entrepreneurship)**  
> **Repository:** [https://github.com/Satvik2Sharma/CareerBridge](https://github.com/Satvik2Sharma/CareerBridge)

---

## 1. Current Architecture

The existing backend is a lightweight FastAPI MVP designed for hackathon demonstration. It uses synchronous SQLite (`careerbridge.db`) via SQLAlchemy 2.0 with in-memory fallback JSON loading (`data/`). 

### High-Level Flow (Current):
```text
HTTP Request → FastAPI Router → In-Memory Engine / MockAI → Hardcoded/Seeded JSON → JSON Response
```

### Limitations:
- No true database persistence or relational integrity (reads directly from in-memory JSON file reads on startup).
- No asynchronous database layer (`asyncpg` / `AsyncSession`).
- No database migration tracking (lacks Alembic).
- No vector search capabilities or `pgvector` embeddings.
- No real-world job ingestion pipeline (NCS, Employment News, UPSC/SSC/IBPS/RRB, Adzuna, Jooble).
- No explicit authentication or multi-tenant authorization (JWT / RBAC).
- Lacks API versioning (`/api/v1/`).

---

## 2. Current Backend Structure

```text
backend/
├── app/
│   ├── main.py                     # FastAPI entry point, CORS middleware, router registration
│   ├── config.py                   # Pydantic v2 settings (AI, CORS, Database URL, Data directory)
│   ├── database.py                 # Synchronous SQLAlchemy engine & get_db dependency
│   ├── schemas/
│   │   └── careerbridge.py         # Pydantic v2 schemas for User, Job, Career, MSME, Assessment
│   ├── routers/
│   │   ├── health.py               # GET /api/health
│   │   ├── skills.py               # GET /api/skills, POST /api/skills/normalize
│   │   ├── jobs.py                 # GET /api/jobs, POST /api/jobs/recommendations, GET /api/jobs/{id}/skill-gap
│   │   ├── careers.py              # GET /api/careers, POST /api/careers/recommendations
│   │   ├── resume.py               # POST /api/resume/analyze
│   │   ├── learning.py             # POST /api/learning-paths/personalized
│   │   ├── assessments.py          # GET /api/assessments, POST /api/assessments/{id}/submit
│   │   ├── readiness.py            # GET /api/readiness/{user_id}
│   │   └── business.py             # GET /api/business/presets, POST /api/business/analyze
│   ├── services/
│   │   ├── ai/
│   │   │   ├── base.py             # Abstract AIProvider interface
│   │   │   ├── factory.py          # AI Provider factory selector
│   │   │   ├── mock_provider.py    # Offline Mock AI Provider
│   │   │   └── openai_provider.py  # OpenAI-compatible API Provider
│   │   ├── matching/
│   │   │   └── scoring_engine.py   # Deterministic 5-part weighted job matching engine
│   │   ├── skill_gap/
│   │   │   └── gap_analyzer.py     # 3-state (Strong, Partial, Missing) skill gap analyzer
│   │   ├── careers/
│   │   │   └── career_engine.py    # Career taxonomy recommendation engine
│   │   ├── business/
│   │   │   └── msme_engine.py      # MSME digital maturity (6 dimensions) & 90-day growth engine
│   │   └── resume/
│   │       └── parser.py           # PyPDF2 text extraction & profile parsing
│   ├── utils/
│   │   └── skill_normalizer.py     # Skill normalization dictionary & regex matcher
│   └── seed/
│       └── loader.py               # Seed JSON file loader utility
├── tests/
│   └── test_engines.py             # Pytest suite for engines (5 tests, 100% PASS)
└── requirements.txt                # Python dependencies
```

---

## 3. Existing Data Inventory

The repository contains 6 seed JSON datasets located at `/home/user/Hackathon-10.0/data/`:

| Dataset Path | Record Count | Schema Summary | Relationships | Quality & Format Assessment |
| :--- | :---: | :--- | :--- | :--- |
| `data/skills.json` | 40 skills | `id`, `name`, `category`, `aliases` (list) | Referenced by Jobs, Careers, Learning Resources | Valid JSON. Canonical names and aliases clean, but lacks parent-child skill relationships and skill levels. |
| `data/careers.json` | 8 careers | `id`, `title`, `category`, `description`, `required_skills`, `preferred_skills`, `education_expectations`, `typical_experience`, `prep_effort_months`, `opportunity_demand` | Maps to `skills.name` string array | High quality seed data. Needs mapping to relational `Career` and `CareerSkill` tables. |
| `data/jobs.json` | 8 jobs | `id`, `title`, `company`, `location`, `work_type`, `experience_level`, `category`, `salary_range`, `career_id`, `required_skills`, `preferred_skills`, `description` | Foreign key `career_id` → `careers.id`, skill names string array | Synthetic demo listings. Lacks real source provenance (`source_url`, `published_at`, `application_deadline`, `verification_status`). |
| `data/learning_resources.json` | 8 resources | `id`, `skill`, `title`, `type`, `provider`, `duration`, `difficulty`, `url`, `practical_task`, `priority` | Foreign key `skill` → `skills.name` | Useful curation. Needs relational table mapping. |
| `data/assessments.json` | 3 quizzes (8 questions) | `id`, `skill`, `title`, `description`, `readiness_boost`, `questions` (list of `id`, `text`, `options`, `correct_index`) | Foreign key `skill` → `skills.name` | Well-structured JSON. Needs relational `Assessment`, `AssessmentQuestion` tables. |
| `data/business_recommendations.json` | 3 MSME presets, 5 catalog recs | `msme_presets` (`business_type`, `name`, `owner_name`, `location`, `employees_count`, `monthly_orders`, `current_tech`, `challenges`, `base_maturity`, `category_scores`) and `recommendations_catalog` (`id`, `title`, `category`, `problem`, `solution`, `expected_benefit`, `effort`, `impact`, `priority`, `cost_category`) | Referenced by MSME engine | Synthetic benchmark data. Needs transition to structured MSME database tables. |

---

## 4. Existing Database Configuration

- **Current DB System**: Synchronous SQLite (`sqlite:///./careerbridge.db`).
- **ORM**: SQLAlchemy 2.0 declarative base (`Base = declarative_base()`) with synchronous `SessionLocal`.
- **Migrations**: Lacks Alembic tracking; tables are created or loaded on-the-fly.
- **Target DB System**: PostgreSQL with `asyncpg`, SQLAlchemy 2.0 `AsyncSession`, `pgvector` extension for semantic similarity search, and Alembic for schema migrations.

---

## 5. Existing API Endpoints

The existing FastAPI server exposes 9 unversioned routes under `/api/`:

| HTTP Method | Route | Purpose | Target Versioned Route |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & active AI provider info | `GET /api/v1/health` |
| `GET` | `/api/skills` | List normalized skill taxonomy | `GET /api/v1/skills` |
| `POST` | `/api/skills/normalize` | Normalize raw skill string | `POST /api/v1/skills/normalize` |
| `GET` | `/api/jobs` | List all job opportunities | `GET /api/v1/jobs` |
| `POST` | `/api/jobs/recommendations` | Top 5 job recommendations with score breakdown | `POST /api/v1/jobs/recommend` |
| `GET` | `/api/jobs/{id}/skill-gap` | 3-state skill gap analysis for a job | `POST /api/v1/skill-gap/analyze` |
| `GET` | `/api/careers` | List career taxonomy paths | `GET /api/v1/careers` |
| `POST` | `/api/careers/recommendations` | Evaluate career path fit | `POST /api/v1/careers/recommend` |
| `POST` | `/api/resume/analyze` | Parse PDF resume into JSON profile | `POST /api/v1/resume/analyze` |
| `POST` | `/api/learning-paths/personalized` | Generate personalized learning roadmap | `GET /api/v1/roadmaps/{career_id}` |
| `GET` | `/api/assessments` | List skill assessment quizzes | `GET /api/v1/assessments` |
| `POST` | `/api/assessments/{id}/submit` | Submit quiz answers & return boost score | `POST /api/v1/assessments/{id}/submit` |
| `GET` | `/api/readiness/{user_id}` | Calculate readiness score | `GET /api/v1/readiness/{user_id}` |
| `GET` | `/api/business/presets` | Get MSME benchmark business presets | `GET /api/v1/msme/presets` |
| `POST` | `/api/business/analyze` | Compute digital maturity & growth roadmap | `POST /api/v1/msme/assessment` |

---

## 6. Existing Engines

| Engine Name | File Path | Purpose | Status & Test Coverage | Dependencies |
| :--- | :--- | :--- | :--- | :--- |
| `SkillNormalizer` | `app/utils/skill_normalizer.py` | Maps raw skill strings (e.g. `python3`, `js`, `reactjs`) to canonical names | Fully functional. Covered in unit tests (`test_skill_normalization`). | Regex & static alias map |
| `JobMatchingEngine` | `app/services/matching/scoring_engine.py` | Computes 5-component weighted job match score (Required 40%, Proficiency 20%, Goal 15%, Experience 10%, Education 5%, Preference 5%, Evidence 5%) | Fully functional. Covered in unit tests (`test_job_matching_engine`). | Pydantic / Json |
| `SkillGapEngine` | `app/services/skill_gap/gap_analyzer.py` | Categorizes role skills into `✓ Strong`, `~ Partial`, `✗ Missing` states | Fully functional. Covered in unit tests (`test_skill_gap_engine`). | Skill Normalizer |
| `CareerMatchingEngine` | `app/services/careers/career_engine.py` | Ranks compatibility across career paths with preparation effort estimates | Fully functional. Covered in unit tests (`test_career_matching_engine`). | Skill Normalizer |
| `MSMEEngine` | `app/services/business/msme_engine.py` | Computes 0-100 digital maturity across 6 dimensions & outputs 90-day growth roadmap | Fully functional. Covered in unit tests (`test_msme_digital_maturity`). | Data catalog |
| `AIProvider` Factory | `app/services/ai/` | Factory abstraction for `MockAIProvider` (offline) & `OpenAICompatibleProvider` | Fully functional fallback interface. | `httpx` / `openai` |

---

## 7. Existing Frontend Dependencies

The frontend (built with Vite + React 18 + TypeScript + Tailwind CSS) interacts with `/api` endpoints via `frontend/src/services/api.ts`.
- Endpoints consumed: `/api/health`, `/api/jobs/recommendations`, `/api/jobs/{id}/skill-gap`, `/api/careers/recommendations`, `/api/resume/analyze`, `/api/learning-paths/personalized`, `/api/assessments`, `/api/assessments/{id}/submit`, `/api/business/analyze`.
- **Requirement**: All existing API contracts MUST be preserved or backward-compatible via API alias adapters while introducing `/api/v1/` endpoints for production.

---

## 8. Technical Debt & Deficiencies

1. **No Production Database**: Currently relies on SQLite / in-memory JSON. Must migrate to PostgreSQL (`asyncpg`) with `Alembic` migrations.
2. **Missing Vector Store**: Semantic matching relies on exact string equality. Needs `pgvector` for embedding cosine distance search across jobs, careers, and candidate profiles.
3. **No Real-World Job Ingestion**: Currently uses 8 synthetic static jobs. Needs a pipeline with source adapters for National Career Service (NCS), Employment News, UPSC, SSC, IBPS, RRB, and private job APIs (Adzuna/Jooble).
4. **No Government Eligibility Engine**: Complex government age, degree, category, and relaxation rules are missing structured logic.
5. **No Authentication or RBAC**: Endpoints lack JWT authentication, password hashing (`passlib`/`bcrypt`), or user authorization.
6. **No Background Worker Architecture**: File uploads and data ingestion are synchronous.
7. **No API Versioning**: All routes are directly under `/api/`.

---

## 9. Target Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FASTAPI API LAYER (/api/v1)                           │
│     Authentication Middleware | Rate Limiting | CORS | Pydantic v2 Schemas       │
└────────────────────────┬────────────────────────────────┬───────────────────────┘
                         │                                │
┌────────────────────────▼───────────┐      ┌─────────────▼───────────────────────┐
│     DETERMINISTIC ENGINES          │      │      PGVECTOR EMBEDDING LAYER       │
│  - Weighted Job Match Engine       │      │  - EmbeddingProvider Abstraction    │
│  - 3-State Skill Gap Analyzer      │      │  - Vector Dimension Config (1536/768)│
│  - Government Eligibility Engine   │      │  - Semantic Cosine Similarity       │
│  - MSME Digital Maturity Engine    │      │  - Hybrid Keyword + Vector Search   │
└────────────────────────┬───────────┘      └─────────────┬───────────────────────┘
                         │                                │
┌────────────────────────▼────────────────────────────────▼───────────────────────┐
│                      DATA ACCESS LAYER (AsyncSession SQLAlchemy 2.0)            │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────▼────────────────────────────────────────┐
│                        POSTGRESQL + PGVECTOR EXTENSION                          │
│     Users | Profiles | Resumes | Skills | Careers | Opportunities | MSME        │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Proposed Relational Database Schema (SQLAlchemy 2.0)

### Key Entities:
1. `User` & `UserProfile` & `Resume`: User authentication, candidate profile details, and parsed resume metadata.
2. `Skill` & `SkillAlias` & `SkillRelationship`: Canonical skill taxonomy, string aliases, and parent-child/related skill graph.
3. `Career` & `CareerSkill`: Career taxonomy roles with skill requirements and prep effort.
4. `Organization`: Employers, recruiting bodies (e.g. UPSC, SSC, Tech Companies).
5. `Opportunity` & `OpportunitySkill`: Unified table supporting `PRIVATE_JOB`, `GOVERNMENT_JOB`, `INTERNSHIP`, `APPRENTICESHIP`, `GIG`. Includes `pgvector` embedding column.
6. `GovernmentRecruitment`, `GovernmentPost`, `GovernmentEligibilityRule`: Dedicated government recruitment models supporting notifications, vacancy counts, age min/max, degree requirements, category relaxations, and official notification URLs.
7. `LearningResource` & `Assessment` & `AssessmentQuestion`: Learning items and interactive readiness quizzes.
8. `BusinessProfile` & `DigitalMaturityAssessment`: MSME business profiles, maturity evaluation history, and growth roadmaps.

---

## 11. pgvector Embedding Strategy

- **Extension**: `CREATE EXTENSION IF NOT EXISTS vector;` enabled via Alembic migration.
- **Provider Abstraction**: `EmbeddingProvider` interface with `MockEmbeddingProvider` (deterministic pseudo-vectors for offline/testing) and `OpenAIEmbeddingProvider` (text-embedding-3-small or custom dimensions).
- **Configurable Vector Dimensions**: Defined in `settings.EMBEDDING_DIMENSIONS` (default: 1536).
- **Deterministic Text Construction**:
  - **Job Document**: `Title: {title} | Organization: {org} | Category: {category} | Description: {desc} | Required Skills: {skills} | Location: {loc}`
  - **Career Document**: `Career: {title} | Category: {category} | Description: {desc} | Required Skills: {skills}`
  - **Skill Document**: `Skill: {name} | Category: {category} | Description: {desc} | Aliases: {aliases}`

---

## 12. Seed & Ingestion Pipeline Architecture

```text
JSON / External Source ──► Adapter ──► Validation ──► Normalization ──► Entity Extractor ──► Upsert (DB) ──► Vector Embedding
```
- **Idempotency**: All seed scripts use PostgreSQL `UPSERT` (`on_conflict_do_update` / `on_conflict_do_nothing`) based on natural keys (e.g., skill name, career code, external job ID).
- **Detailed Execution Statistics**: Reports records discovered, inserted, updated, skipped, rejected, and embeddings generated.

---

## 13. Real Data Source Framework

| Source | Type | Access Method | Legal & Terms Status | Implementation Status |
| :--- | :--- | :--- | :--- | :--- |
| **National Career Service (NCS)** | Government Jobs & Skill Listings | Official API / Public Feed | Requires Government API Partner Key | Adapter Interface + Fixtures + Credential Pending Status |
| **UPSC / SSC / IBPS / RRB** | Central Government Recruitment | Official Recruitment Bulletins | Public Notifications / Open Data | Structured Government Models + Notification Link Attribution |
| **Adzuna API** | Private Jobs (India Region) | REST API | Official Developer API Key | Adapter Interface + Live API Driver |
| **Jooble API** | Private Jobs & Internships | REST API | Official Publisher Key | Adapter Interface + Live API Driver |

---

## 14. API Versioning Plan (`/api/v1/`)

- Introduce versioned REST API routes under `/api/v1/`.
- Provide backward-compatible alias redirects for legacy `/api/` endpoints to prevent breaking existing frontend features.

---

## 15. Implementation Phases & Milestones

- **Phase 1**: Backend Audit & Architecture Specification (`docs/backend-audit.md`).
- **Phase 2**: PostgreSQL + SQLAlchemy 2.0 Async (`asyncpg`) + Alembic Migration Infrastructure.
- **Phase 3**: Relational Data Models & ORM Specifications.
- **Phase 4**: Pydantic v2 Request/Response Schemas & API Versioning (`/api/v1/`).
- **Phase 5**: Seed Pipeline & Data Ingestion (PostgreSQL Upsert).
- **Phase 6**: `pgvector` Extension & Embedding Abstraction Layer.
- **Phase 7**: Real Data Source Adapters (NCS, Adzuna, Government Recruitment).
- **Phase 8**: Government Eligibility Engine & Hybrid Recommendation Scoring.
- **Phase 9**: Production Authentication (JWT + Password Hashing), Testing, and Hardening.

---

## 16. Risks & Mitigation Strategies

1. **Database Connection Mismatch**: Transition from SQLite to PostgreSQL requires `asyncpg` async drivers.
   - *Mitigation*: Fallback connection string handling and isolated async session dependency.
2. **Missing API Keys during Hackathon Evaluation**:
   - *Mitigation*: `MockAIProvider` and `MockEmbeddingProvider` ensure 100% offline functionality without external key dependencies.
3. **Frontend API Disruption**:
   - *Mitigation*: Retain `/api/` route mappings as backward-compatible wrappers pointing to `/api/v1/`.

---

## 17. Phase 1 Audit Conclusion & Next Steps

Audit completed cleanly. We are ready to proceed to **Phase 2** (PostgreSQL + AsyncSQLAlchemy + Alembic setup).
