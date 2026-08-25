from fastapi import APIRouter
from app.routers.v1 import (
    auth,
    skills,
    jobs,
    government,
    careers,
    resume,
    skill_gap,
    roadmaps,
    assessments,
    msme,
    ingestion
)

api_v1_router = APIRouter()

api_v1_router.include_router(auth.router)
api_v1_router.include_router(skills.router)
api_v1_router.include_router(jobs.router)
api_v1_router.include_router(government.router)
api_v1_router.include_router(careers.router)
api_v1_router.include_router(resume.router)
api_v1_router.include_router(skill_gap.router)
api_v1_router.include_router(roadmaps.router)
api_v1_router.include_router(assessments.router)
api_v1_router.include_router(msme.router)
api_v1_router.include_router(ingestion.router)
