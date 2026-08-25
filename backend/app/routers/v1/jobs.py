from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any

from app.database import get_db
from app.models.opportunity import Opportunity, OpportunitySkill
from app.schemas.careerbridge import UserProfileSchema, JobRecommendationResponse, JobSchema
from app.services.matching.scoring_engine import JobMatchingEngine

router = APIRouter(prefix="/api/v1/jobs", tags=["Jobs & Opportunities"])
matching_engine = JobMatchingEngine()

@router.get("", response_model=Dict[str, List[JobSchema]])
async def list_jobs(db: AsyncSession = Depends(get_db)):
    stmt = select(Opportunity).options(selectinload(Opportunity.skills).selectinload(OpportunitySkill.skill))
    res = await db.execute(stmt)
    opps = res.scalars().all()
    if not opps:
        return {"jobs": []}

    jobs = [
        JobSchema(
            id=o.id,
            title=o.title,
            company=o.company_name,
            location=o.location or "Remote",
            work_type=o.work_type or "Hybrid",
            experience_level=o.experience_level or "0-2 years",
            category=o.category,
            salary_range=o.salary_range or "Competitive",
            career_id=o.career_id or "car-1",
            required_skills=[s.skill.name for s in o.skills if s.is_required == "true"],
            preferred_skills=[s.skill.name for s in o.skills if s.is_required == "false"],
            description=o.description or "",
            type=o.type,
            source=o.source,
            source_url=o.source_url,
            verification_status=o.verification_status
        )
        for o in opps
    ]
    return {"jobs": jobs}

@router.get("/{job_id}", response_model=JobSchema)
async def get_job_by_id(job_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(Opportunity).where(Opportunity.id == job_id).options(selectinload(Opportunity.skills).selectinload(OpportunitySkill.skill))
    res = await db.execute(stmt)
    o = res.scalars().first()
    if not o:
        raise HTTPException(status_code=404, detail=f"Job opportunity '{job_id}' not found.")

    return JobSchema(
        id=o.id,
        title=o.title,
        company=o.company_name,
        location=o.location or "Remote",
        work_type=o.work_type or "Hybrid",
        experience_level=o.experience_level or "0-2 years",
        category=o.category,
        salary_range=o.salary_range or "Competitive",
        career_id=o.career_id or "car-1",
        required_skills=[s.skill.name for s in o.skills if s.is_required == "true"],
        preferred_skills=[s.skill.name for s in o.skills if s.is_required == "false"],
        description=o.description or "",
        type=o.type,
        source=o.source,
        source_url=o.source_url,
        verification_status=o.verification_status
    )

@router.post("/recommend", response_model=Dict[str, List[JobRecommendationResponse]])
async def get_job_recommendations(profile: UserProfileSchema, db: AsyncSession = Depends(get_db)):
    stmt = select(Opportunity).options(selectinload(Opportunity.skills).selectinload(OpportunitySkill.skill))
    res = await db.execute(stmt)
    opps = res.scalars().all()
    
    if not opps:
        return {"top_recommendations": []}

    jobs_list = []
    for o in opps:
        jobs_list.append({
            "id": o.id,
            "title": o.title,
            "company": o.company_name,
            "location": o.location or "Remote",
            "work_type": o.work_type or "Hybrid",
            "experience_level": o.experience_level or "0-2 years",
            "category": o.category,
            "salary_range": o.salary_range or "Competitive",
            "career_id": o.career_id or "car-1",
            "required_skills": [s.skill.name for s in o.skills if s.is_required == "true"],
            "preferred_skills": [s.skill.name for s in o.skills if s.is_required == "false"],
            "description": o.description or ""
        })

    recommendations = []
    for j in jobs_list:
        match_result = matching_engine.calculate_match(profile.model_dump(), j)
        overall_match = match_result["overall_match"]
        matched_skills = match_result["matched_skills"]
        missing_skills = match_result["missing_skills"]
        
        explanation = f"Matched {len(matched_skills)} key skills ({', '.join(matched_skills[:3]) if matched_skills else 'None'}). Alignment with {j['title']} goal."
        
        rec = JobRecommendationResponse(
            job_id=j["id"],
            job_title=j["title"],
            company=j["company"],
            overall_match=overall_match,
            breakdown=match_result["breakdown"],
            matched_skills=matched_skills,
            matched_preferred_skills=match_result["matched_preferred_skills"],
            missing_skills=missing_skills,
            explanation=explanation,
            job_details=JobSchema(**j)
        )
        recommendations.append(rec)

    recommendations.sort(key=lambda x: x.overall_match, reverse=True)
    return {"top_recommendations": recommendations[:5]}
