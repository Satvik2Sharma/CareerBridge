from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Dict, Any

from app.database import get_db
from app.models.msme import BusinessProfile as BusinessProfileModel
from app.schemas.careerbridge import (
    BusinessProfileSchema,
    MSMEAnalysisResponse,
    MSMERecommendationSchema,
    MSMERoadmapPhaseSchema
)
from app.services.business.msme_engine import MSMEEngine
from app.seed.loader import seed_loader

router = APIRouter(prefix="/api/v1/msme", tags=["MSME Digital Maturity Intelligence"])
msme_engine = MSMEEngine()

@router.get("/presets", response_model=Dict[str, List[Dict[str, Any]]])
async def get_msme_presets():
    biz_data = seed_loader.load_business_recommendations()
    return {"msme_presets": biz_data.get("msme_presets", [])}

@router.post("/assessment", response_model=MSMEAnalysisResponse)
async def analyze_msme_business(profile: BusinessProfileSchema, db: AsyncSession = Depends(get_db)):
    result = msme_engine.evaluate_business(profile.model_dump())
    
    recs = [
        MSMERecommendationSchema(
            id=r["id"],
            title=r["title"],
            category=r["category"],
            problem=r["problem"],
            solution=r["solution"],
            expected_benefit=r["expected_benefit"],
            effort=r["effort"],
            impact=r["impact"],
            priority=r["priority"],
            cost_category=r["cost_category"]
        )
        for r in result["recommendations"]
    ]

    roadmap = [
        MSMERoadmapPhaseSchema(
            month=phase["month"],
            phase=phase["phase"],
            focus=phase["focus"],
            action_items=phase["action_items"]
        )
        for phase in result["roadmap_90_day"]
    ]

    return MSMEAnalysisResponse(
        business_name=result["business_name"],
        business_type=result["business_type"],
        digital_maturity_score=result["digital_maturity_score"],
        category_scores=result["category_scores"],
        recommendations=recs,
        roadmap_90_day=roadmap
    )
