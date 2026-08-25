from fastapi import APIRouter
from typing import List, Optional
from app.services.ai.factory import get_ai_provider
from app.schemas.careerbridge import UserProfileSchema

router = APIRouter(prefix="/api", tags=["Learning"])

@router.post("/learning-paths/personalized")
def generate_personalized_roadmap(
    user_profile: UserProfileSchema,
    career_goal: Optional[str] = "Backend Developer",
    target_missing_skills: Optional[List[str]] = None
):
    current_skills = user_profile.skills
    missing_skills = target_missing_skills or ["Spring Boot", "Docker", "PostgreSQL", "CI/CD"]
    
    # Filter out skills the user already possesses!
    filtered_missing = [s for s in missing_skills if s not in current_skills]
    if not filtered_missing:
        filtered_missing = ["Advanced Microservices Architecture", "Docker Security Hardening"]

    ai_provider = get_ai_provider()
    roadmap = ai_provider.generate_personalized_roadmap(
        career_goal=career_goal,
        current_skills=current_skills,
        missing_skills=filtered_missing
    )

    return {
        "career_goal": career_goal,
        "current_skills": current_skills,
        "addressed_gaps": filtered_missing,
        "roadmap": roadmap
    }
