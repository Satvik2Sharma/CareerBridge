# CareerBridge — AI-Powered Career & Business Intelligence Platform

> **Bridge the Gap Between Skills and Opportunities.**

[![HACKN'TECH 10.0](https://img.shields.io/badge/Hackathon-HACKN'TECH%2010.0-blue.svg)](https://github.com/Satvik2Sharma/CareerBridge)
[![Theme 8](https://img.shields.io/badge/Theme-Future%20of%20Work-emerald.svg)](https://github.com/Satvik2Sharma/CareerBridge)
[![React Router v6](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TS%20%7C%20Tailwind-blue.svg)](https://github.com/Satvik2Sharma/CareerBridge)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20SQLAlchemy%202.0-009688.svg)](https://github.com/Satvik2Sharma/CareerBridge)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 📌 Executive Overview

**CareerBridge** is a production-grade, AI-powered employability and business opportunity intelligence SaaS platform built for **HACKN'TECH 10.0** under **Theme 8: Future of Work (Technology for Employment & Entrepreneurship)**.

CareerBridge provides dual core intelligence portals:
1. **Candidate Employability Portal**: Intelligently bridges skill gaps for job seekers with deterministic 5-weight match scoring, 3-state skill gap analysis, official government recruitment eligibility verification, and personalized learning roadmaps.
2. **MSME Growth Portal**: Empowers micro, small & medium enterprises with digital maturity diagnostic scoring (0–100), low-cost technology recommendations, and an actionable 90-day growth execution blueprint.

---

## 🌟 Key Features & Capabilities

### 💼 Candidate Employability Portal
- **AI Profile & PDF/DOCX Resume Parser**: Automatically extracts verified technical skills, education degrees, experience, and profile recommendations.
- **Deterministic 5-Tier Job Match Engine**: Transparent 0–100% score calculation based on required skill match (35%), skill proficiency (20%), career goal alignment (20%), experience level (15%), and location preferences (10%).
- **3-State Skill Gap Breakdown**: Categorizes skills into `✓ Strong`, `◐ Partial`, and `○ Priority Missing Gaps` with priority rankings and estimated learning efforts.
- **Government Opportunity & Official Eligibility Engine**: Live recruitment bulletins from UPSC, SSC, IBPS, and RRB with an automated age relaxation evaluator enforcing category rules (OBC +3 yrs, SC/ST +5 yrs, PWD +10 yrs).
- **Career Fit Matrix & Explorer**: Engineering career taxonomy matching with side-by-side skill comparison matrices across 25+ technical roles.
- **Personalized AI Learning Roadmap**: Step-by-step learning path that dynamically skips skills already mastered.
- **Interactive Verification Quizzes**: 5-minute skill assessments that recalculate career readiness scores and unlock matching opportunities.

### 🏬 MSME Growth Intelligence Portal
- **Enterprise Diagnostics & Presets**: Pre-configured templates for retail stores, restaurants/cafes, kirana shops, and service businesses.
- **0–100 Digital Maturity Diagnostic**: Evaluates enterprise capability across 6 dimensions (Digital Payments, Billing Automation, Inventory System, Online Catalog, Customer Communication, Marketing Automation).
- **Curated Low-Cost Tech Recommendations**: Problem, Solution, Cost, Effort, and Expected Growth Benefit breakdowns.
- **90-Day Execution Blueprint**: Actionable Month 1, Month 2, and Month 3 step-by-step growth roadmap.

---

## 🏗️ System Architecture & Technology Stack

```
                                  ┌─────────────────────────────────────────┐
                                  │           CareerBridge SaaS             │
                                  └────────────────────┬────────────────────┘
                                                       │
                           ┌───────────────────────────┴───────────────────────────┐
                           ▼                                                       ▼
            ┌─────────────────────────────┐                         ┌─────────────────────────────┐
            │   React 18 + TypeScript     │                         │      FastAPI Backend        │
            │   React Router v6           │ ─── REST API /api/v1 ──►│      SQLAlchemy 2.0 Async   │
            │   Tailwind CSS (Dark Mode)  │                         │      Alembic Migrations     │
            └─────────────────────────────┘                         └──────────────┬──────────────┘
                                                                                   │
                                                                                   ▼
                                                                    ┌─────────────────────────────┐
                                                                    │    Vector Embeddings &      │
                                                                    │    AI Provider Layer        │
                                                                    └─────────────────────────────┘
```

- **Frontend**: React 18, TypeScript, React Router v6, Tailwind CSS, Lucide React Icons.
- **Backend**: Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2.0 Async ORM, Alembic, SQLite/PostgreSQL.
- **AI & Vector Layer**: Abstracted `AIProvider` supporting deterministic matching, vector embeddings, and dual mode switching (`MockAIProvider` for 100% offline hackathon reliability and `OpenAICompatibleProvider`).

---

## 🚀 One-Line Quick Start

Clone the repository and launch the full application (Backend + Frontend) with a single command:

```bash
git clone https://github.com/Satvik2Sharma/CareerBridge.git
cd CareerBridge
./start.sh
```

Once running:
- 🌐 **Web App Dashboard**: [`http://localhost:5173`](http://localhost:5173)
- ⚡ **Backend REST API**: [`http://localhost:8000`](http://localhost:8000)
- 📚 **Swagger API Docs**: [`http://localhost:8000/docs`](http://localhost:8000/docs)

---

## 🛠️ Manual Execution & Development Setup

### 1. Backend Server Setup
```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start FastAPI server
PYTHONPATH=backend ./venv/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend SaaS App Setup
```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

---

## 🧪 Testing & Verification

### Backend Unit & Engine Tests
```bash
PYTHONPATH=backend ./venv/bin/pytest backend/tests/
```

### Frontend Type Checking & Production Build
```bash
cd frontend
npx tsc --noEmit
npm run build
```

---

## 📜 Environment Configuration (`.env`)

```env
APP_NAME=CareerBridge
VERSION=1.0.0
ENV=development
HOST=0.0.0.0
PORT=8000

# AI Provider Configuration (mock / openai / ollama)
AI_PROVIDER=mock
AI_MODEL=gpt-4o-mini
AI_API_KEY=

# Database Connection
DATABASE_URL=sqlite+aiosqlite:///./careerbridge.db

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## 👥 Hackathon Details

- **Hackathon**: COER University HACKN'TECH 10.0 (2026)
- **Theme**: Theme 8: Future of Work — Technology for Employment & Entrepreneurship
- **Repository**: [Satvik2Sharma/CareerBridge](https://github.com/Satvik2Sharma/CareerBridge)
- **Primary Branch**: `master`

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
