from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any

from app.database import get_db
from app.models.career import Career, CareerSkill
from app.schemas.careerbridge import UserProfileSchema, CareerRecommendationResponse
from app.services.careers.career_engine import CareerMatchingEngine

router = APIRouter(prefix="/api/v1/careers", tags=["Careers Taxonomy"])

@router.get("", response_model=Dict[str, List[Dict[str, Any]]])
async def list_careers(db: AsyncSession = Depends(get_db)):
    stmt = select(Career).options(selectinload(Career.skills).selectinload(CareerSkill.skill))
    res = await db.execute(stmt)
    careers = res.scalars().all()
    if not careers:
        return {"careers": []}

    out = []
    for c in careers:
        out.append({
            "id": c.id,
            "title": c.title,
            "category": c.category,
            "description": c.description,
            "required_skills": [s.skill.name for s in c.skills if s.is_required == "true"],
            "preferred_skills": [s.skill.name for s in c.skills if s.is_required == "false"],
            "education_expectations": c.education_expectations,
            "typical_experience": c.typical_experience,
            "prep_effort_months": c.prep_effort_months,
            "opportunity_demand": c.opportunity_demand
        })
    return {"careers": out}

@router.post("/recommend", response_model=Dict[str, List[CareerRecommendationResponse]])
async def get_career_recommendations(profile: UserProfileSchema, db: AsyncSession = Depends(get_db)):
    stmt = select(Career).options(selectinload(Career.skills).selectinload(CareerSkill.skill))
    res = await db.execute(stmt)
    careers = res.scalars().all()
    
    if not careers:
        return {"career_recommendations": []}

    career_list = []
    for c in careers:
        career_list.append({
            "id": c.id,
            "title": c.title,
            "category": c.category,
            "description": c.description or "",
            "required_skills": [s.skill.name for s in c.skills if s.is_required == "true"],
            "preferred_skills": [s.skill.name for s in c.skills if s.is_required == "false"],
            "education_expectations": c.education_expectations,
            "typical_experience": c.typical_experience or "0-2 years",
            "prep_effort_months": c.prep_effort_months or "2-4 months",
            "opportunity_demand": c.opportunity_demand or "High"
        })

    engine = CareerMatchingEngine(career_list)
    results = engine.evaluate_career_fit(profile.model_dump())

    recs = []
    for r in results:
        recs.append(
            CareerRecommendationResponse(
                career_id=r["career_id"],
                title=r["title"],
                category=r["category"],
                match_score=r["match_score"],
                description=r["description"],
                strengths=r["strengths"],
                gaps=r["gaps"],
                prep_effort_months=r["prep_effort_months"],
                typical_experience=r["typical_experience"],
                explanation=r.get("explanation"),
                next_step=r.get("next_step")
            )
        )
    return {"career_recommendations": recs}
