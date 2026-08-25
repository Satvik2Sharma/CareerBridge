from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Dict, Any

from app.database import get_db
from app.models.opportunity import Opportunity
from app.schemas.careerbridge import SkillGapResponse
from app.services.skill_gap.gap_analyzer import SkillGapEngine
from app.seed.loader import seed_loader

router = APIRouter(prefix="/api/v1/skill-gap", tags=["Skill Gap Analysis"])
gap_engine = SkillGapEngine()

@router.post("/analyze", response_model=SkillGapResponse)
async def analyze_skill_gap(
    job_id: str,
    user_skills: List[str],
    db: AsyncSession = Depends(get_db)
):
    res = await db.execute(select(Opportunity).where(Opportunity.id == job_id))
    opp_obj = res.scalars().first()

    job_data = None
    if opp_obj:
        job_data = {
            "id": opp_obj.id,
            "title": opp_obj.title,
            "required_skills": [s.skill.name for s in opp_obj.skills if s.is_required == "true"] or ["Java", "SQL", "REST APIs", "Git"],
            "preferred_skills": [s.skill.name for s in opp_obj.skills if s.is_required == "false"] or ["Spring Boot", "Docker"]
        }
    else:
        for seed_j in seed_loader.load_jobs():
            if seed_j["id"] == job_id:
                job_data = seed_j
                break

    if not job_data:
        job_data = {
            "id": job_id,
            "title": "Backend Developer Intern / Junior",
            "required_skills": ["Java", "SQL", "REST APIs", "Git"],
            "preferred_skills": ["Spring Boot", "Docker"]
        }

    analysis = gap_engine.analyze_gap(user_skills, job_data)
    return SkillGapResponse(**analysis)
