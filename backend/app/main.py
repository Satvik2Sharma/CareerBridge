from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import (
    health,
    skills,
    jobs,
    careers,
    resume,
    learning,
    assessments,
    readiness,
    business
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="CareerBridge — AI-Powered Career & MSME Opportunity Intelligence Platform"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router)
app.include_router(skills.router)
app.include_router(jobs.router)
app.include_router(careers.router)
app.include_router(resume.router)
app.include_router(learning.router)
app.include_router(assessments.router)
app.include_router(readiness.router)
app.include_router(business.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to CareerBridge API",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
