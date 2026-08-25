from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any

from app.database import get_db
from app.models.government import GovernmentRecruitment, GovernmentPost
from app.schemas.careerbridge import (
    GovernmentRecruitmentSchema,
    GovernmentPostSchema,
    GovernmentEligibilityRequest,
    GovernmentEligibilityResponse
)
from app.services.government.eligibility_engine import government_eligibility_engine

router = APIRouter(prefix="/api/v1/government", tags=["Government Opportunities & Eligibility"])

@router.get("/recruitments", response_model=Dict[str, List[GovernmentRecruitmentSchema]])
async def list_government_recruitments(db: AsyncSession = Depends(get_db)):
    stmt = select(GovernmentRecruitment).options(selectinload(GovernmentRecruitment.posts))
    res = await db.execute(stmt)
    recs = res.scalars().all()
    out = []
    for r in recs:
        posts = [
            GovernmentPostSchema(
                id=p.id,
                recruitment_id=p.recruitment_id,
                post_name=p.post_name,
                department=p.department,
                pay_level=p.pay_level,
                vacancies=p.vacancies,
                education_required=p.education_required,
                degree=p.degree,
                branch=p.branch,
                age_min=p.age_min,
                age_max=p.age_max,
                experience_years_required=p.experience_years_required
            )
            for p in r.posts
        ]
        out.append(
            GovernmentRecruitmentSchema(
                id=r.id,
                recruiting_body=r.recruiting_body,
                recruitment_name=r.recruitment_name,
                notification_number=r.notification_number,
                notification_url=r.notification_url,
                official_apply_url=r.official_apply_url,
                total_vacancies=r.total_vacancies,
                selection_process=r.selection_process,
                status=r.status,
                posts=posts
            )
        )
    return {"recruitments": out}

@router.post("/eligibility", response_model=GovernmentEligibilityResponse)
async def check_government_eligibility(
    req: GovernmentEligibilityRequest,
    post_id: str = "default-post",
    db: AsyncSession = Depends(get_db)
):
    stmt = select(GovernmentPost).where(GovernmentPost.id == post_id).options(selectinload(GovernmentPost.recruitment))
    res = await db.execute(stmt)
    post_obj = res.scalars().first()
    
    post_details = {
        "post_name": "Assistant Section Officer (ASO) - Digital Governance",
        "degree": "B.Tech",
        "age_min": 18,
        "age_max": 30,
        "experience_years_required": 0
    }
    recruitment_details = {
        "id": "upsc-cse-2026",
        "recruiting_body": "UPSC",
        "notification_url": "https://upsc.gov.in"
    }

    if post_obj:
        post_details = {
            "post_name": post_obj.post_name,
            "degree": post_obj.degree or "B.Tech",
            "age_min": post_obj.age_min,
            "age_max": post_obj.age_max,
            "experience_years_required": post_obj.experience_years_required
        }
        if post_obj.recruitment:
            recruitment_details = {
                "id": post_obj.recruitment.id,
                "recruiting_body": post_obj.recruitment.recruiting_body,
                "notification_url": post_obj.recruitment.notification_url
            }

    return government_eligibility_engine.evaluate_eligibility(req, post_details, recruitment_details)
