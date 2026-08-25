from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import async_engine, Base

# Include version 1 API routers
from app.routers.v1 import api_v1_router

# Legacy Routers for Frontend Backward-Compatibility
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

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB Tables on startup
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="CareerBridge — AI-Powered Career & MSME Opportunity Intelligence Platform",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Versioned API Routes (/api/v1)
app.include_router(api_v1_router)

# Legacy API Routes (/api) for Frontend Compatibility
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
        "message": "Welcome to CareerBridge Production API",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "api_v1_health": "/api/v1/health",
        "legacy_health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
