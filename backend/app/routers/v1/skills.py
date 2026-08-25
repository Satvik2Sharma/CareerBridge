from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any
from app.database import get_db
from app.models.skill import Skill
from app.utils.skill_normalizer import skill_normalizer

router = APIRouter(prefix="/api/v1/skills", tags=["Skills Taxonomy"])

@router.get("", response_model=Dict[str, List[Dict[str, Any]]])
async def list_skills(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Skill).options(selectinload(Skill.aliases)))
    skills = res.scalars().all()
    if not skills:
        return {"skills": skill_normalizer.get_all_skills()}
    
    return {
        "skills": [
            {
                "id": s.id,
                "name": s.name,
                "category": s.category,
                "aliases": [a.alias for a in s.aliases]
            }
            for s in skills
        ]
    }

@router.post("/normalize")
async def normalize_skill(payload: Dict[str, str]):
    raw = payload.get("raw_skill", "")
    canonical = skill_normalizer.normalize(raw)
    return {"raw_skill": raw, "normalized_skill": canonical}
