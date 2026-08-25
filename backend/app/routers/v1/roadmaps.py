from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Dict, Any

from app.database import get_db
from app.models.learning import LearningResource
from app.schemas.careerbridge import LearningRoadmapItemSchema, UserProfileSchema
from app.seed.loader import seed_loader

router = APIRouter(prefix="/api/v1/roadmaps", tags=["Learning Roadmaps"])

@router.post("/personalized", response_model=Dict[str, List[LearningRoadmapItemSchema]])
async def get_personalized_roadmap(payload: Dict[str, Any], db: AsyncSession = Depends(get_db)):
    profile = payload.get("user_profile", {})
    career_goal = payload.get("career_goal", "Backend Developer")
    target_missing = payload.get("target_missing_skills", ["Spring Boot", "Docker"])

    if not target_missing:
        target_missing = ["Spring Boot", "Docker"]

    resources = seed_loader.load_learning_resources()
    res_map = {r["skill"].lower(): r for r in resources}

    roadmap = []
    for idx, skill_name in enumerate(target_missing[:4], start=1):
        res_info = res_map.get(skill_name.lower())
        if res_info:
            item = LearningRoadmapItemSchema(
                week=idx,
                skill=skill_name,
                title=res_info["title"],
                objective=f"Master {skill_name} core principles and apply in practical task.",
                duration=res_info["duration"],
                difficulty=res_info["difficulty"],
                resources=[{"title": res_info["provider"], "type": res_info["type"], "url": res_info["url"]}],
                practical_task=res_info["practical_task"],
                status="pending"
            )
        else:
            item = LearningRoadmapItemSchema(
                week=idx,
                skill=skill_name,
                title=f"Mastering {skill_name} Fundamentals",
                objective=f"Build hands-on practical project demonstrating competence in {skill_name}.",
                duration="8 hours",
                difficulty="Intermediate",
                resources=[{"title": f"{skill_name} Official Documentation", "type": "Interactive Guide", "url": "https://docs.example.com"}],
                practical_task=f"Implement a working microservice module utilizing {skill_name}.",
                status="pending"
            )
        roadmap.append(item)

    return {"roadmap": roadmap}
