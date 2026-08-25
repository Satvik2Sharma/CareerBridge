# CareerBridge — API Specifications

Base URL: `http://localhost:8000/api`

## Health Check
- `GET /api/health` — System status and active AI provider info.

## Skills & Taxonomy
- `GET /api/skills` — Returns normalized skills taxonomy dataset.
- `POST /api/skills/normalize` — Normalizes raw skill strings into canonical names.

## Jobs & Matching
- `GET /api/jobs` — List all job opportunities.
- `POST /api/jobs/recommendations` — Returns top 5 job recommendations with match breakdown percentages and AI explanations.
- `GET /api/jobs/{id}/skill-gap` — Returns 3-state skill gap analysis for a specific job.

## Careers
- `GET /api/careers` — List career taxonomy paths.
- `POST /api/careers/recommendations` — Returns career path fit scores and next steps.

## Resume AI
- `POST /api/resume/analyze` — Parses uploaded PDF resume or raw text into structured JSON profile.

## Learning Roadmaps
- `POST /api/learning-paths/personalized` — Generates week-by-week personalized learning path skipping skills user already masters.

## Assessments & Readiness
- `GET /api/assessments` — List skill assessment quizzes.
- `POST /api/assessments/{id}/submit` — Submits quiz answers, calculates percentage score, readiness score boost, and unlocked opportunities.
- `GET /api/readiness/{user_id}` — User readiness score metrics.

## MSME Intelligence
- `GET /api/business/presets` — Pre-seeded local business templates (Clothing Store, Restaurant, Kirana).
- `POST /api/business/analyze` — Evaluates 0-100 digital maturity, 6-category breakdown, recommendations, and 90-day growth roadmap.
