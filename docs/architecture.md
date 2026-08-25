# CareerBridge — System Architecture & Technical Design

## 1. Overview
**CareerBridge** is an AI-powered employability and business opportunity intelligence platform designed for **HACKN'TECH 10.0 (Theme 8: Future of Work — Technology for Employment & Entrepreneurship)**.

It provides dual intelligence modules:
1. **Career Intelligence**: Evaluates individual skills, extracts PDF resumes, ranks job compatibility via deterministic scoring, categorizes skill gaps, and generates personalized learning roadmaps.
2. **MSME Intelligence**: Measures digital maturity for small businesses across 6 dimensions, recommends high-impact technology solutions, and outputs a 90-day growth roadmap.

---

## 2. Monorepo Architecture

```text
Hackathon-10.0/
├── frontend/             # Vite + React 18 + TypeScript + Tailwind CSS + Lucide Icons + Recharts
├── backend/              # Python 3.12 + FastAPI + SQLAlchemy + Pydantic v2 + PyPDF2/pypdf
├── data/                 # Seed JSON datasets (jobs, careers, skills taxonomy, resources, assessments, MSME benchmarks)
├── docs/                 # Architecture, API specs, and MVP demo walkthrough
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 3. Core Deterministic Engines

### A. Job Matching Engine (`backend/app/services/matching/scoring_engine.py`)
Matches candidate profile against job opportunities using explainable weights:
- **Required Skill Match**: 40%
- **Skill Proficiency & Preferred Skills**: 20%
- **Career Goal Alignment**: 15%
- **Experience Match**: 10%
- **Education Compatibility**: 5%
- **Location/Work Preference**: 5%
- **Profile Evidence**: 5%

### B. Skill Gap Analyzer (`backend/app/services/skill_gap/gap_analyzer.py`)
Categorizes target job skills into 3 explicit states:
- `✓ Strong`: Verified skills possessed by the user.
- `~ Partial`: Skills with related baseline knowledge.
- `✗ Missing`: Missing mandatory skills prioritized by job frequency, target proficiency, and effort.

### C. MSME Digital Maturity Engine (`backend/app/services/business/msme_engine.py`)
Scores small business digital maturity (0-100 score) across 6 dimensions:
- Payments (80% if soundbox/QR/POS active)
- Inventory (80% if cloud stock app used)
- Online Presence (75% if WhatsApp store or website active)
- Analytics (70% if CRM/data logged)
- Marketing (75% if social media/Google Business active)
- Cybersecurity (60% if backup/2FA active)

---

## 4. AI Provider Abstraction (`backend/app/services/ai/`)
- `AIProvider`: Base interface defining `parse_resume_text`, `explain_job_match`, `generate_career_explanation`, `generate_personalized_roadmap`, `analyze_msme_business`.
- `MockAIProvider`: 100% offline, deterministic fallback guaranteeing fast hackathon evaluation without external API keys.
- `OpenAICompatibleProvider`: Supports live OpenAI-compatible LLM endpoints when `AI_API_KEY` is provided.
