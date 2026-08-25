# CareerBridge — AI-Powered Career & Business Intelligence Platform

> **Bridge the Gap Between Skills and Opportunities.**

**HACKN'TECH 10.0 — Theme 8: Future of Work (Technology for Employment & Entrepreneurship)**

CareerBridge is an AI-powered employability and business opportunity intelligence platform. It bridges the gap between individuals seeking optimal career paths and small businesses (MSMEs) aiming to boost digital capability and productivity.

---

## 🌟 Key Features

### 1. Career Intelligence Module
- **AI Profile & PDF Resume Parsing**: Extracts structured skills, education, experience, projects, certifications, strengths, and profile suggestions.
- **Top 5 Job Recommendation Engine**: Deterministic & explainable scoring engine (Required Skill Match 40%, Skill Proficiency 20%, Career Goal 15%, Experience 10%, Education 5%, Preference 5%, Evidence 5%).
- **Skill Gap Analysis**: 3-state skill status (`✓ Strong`, `~ Partial`, `✗ Missing`) with priority ranking and learning effort estimates.
- **AI Career Taxonomy Recommendation**: Evaluates compatibility across 25+ career paths with preparation time estimates.
- **Personalized Learning Roadmap**: Custom week-by-week learning timeline that skips skills you already master.
- **Interactive Assessment Quizzes**: Test skills, recalculate career readiness score (e.g. 82% → 91%), and unlock new opportunities.

### 2. MSME / Entrepreneurship Intelligence Module
- **Business Profile Onboarding**: Supports local retail, food, repair, grocery, and service businesses.
- **Digital Maturity Assessment**: Evaluates digital readiness (0-100 score) across 6 dimensions (Payments, Inventory, Online Presence, Analytics, Marketing, Cybersecurity).
- **Prioritized Tech Recommendations**: Clear Problem, Solution, Impact, Effort, and Cost breakdowns.
- **90-Day Digital Growth Roadmap**: Structured Month 1, Month 2, and Month 3 execution timeline.

---

## 🏗️ Project Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts.
- **Backend**: Python 3.12, FastAPI, Pydantic v2, SQLAlchemy, PyPDF2/pypdf.
- **AI Layer**: Abstracted `AIProvider` interface featuring `MockAIProvider` (100% offline hackathon reliability) and `OpenAICompatibleProvider`.
- **Database**: SQLite default (PostgreSQL compatible).

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Run Backend Server
```bash
# From project root
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

# Start FastAPI server
PYTHONPATH=backend python3 -m uvicorn app.main:app --reload --port 8000
```
Backend API will be accessible at: `http://localhost:8000`  
API Swagger Docs: `http://localhost:8000/docs`

### 2. Run Frontend Application
```bash
# In a new terminal window
cd frontend
npm install
npm run dev
```
Frontend web app will be accessible at: `http://localhost:5173`

---

## 🧪 Running Tests

### Backend Unit & Engine Tests
```bash
PYTHONPATH=backend ./venv/bin/pytest backend/tests/test_engines.py
```

### Frontend Build Verification
```bash
cd frontend && npm run build
```

---

## ⚙️ Environment Variables (`.env`)

```env
AI_PROVIDER=mock
AI_MODEL=gpt-4o-mini
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
DATABASE_URL=sqlite:///./careerbridge.db
```

---

## 👤 Demo Presets
- **Demo User**: Aarav Sharma (B.Tech CS, intern, Python/Java/SQL/React/Git/REST APIs). Click **"Load Aarav's Demo"** in the top navigation.
- **Demo Business**: Local Clothing Store (Roorkee, 3 employees, WhatsApp + Excel). Click **"Load Clothing Store Demo"** in the top navigation.
