from fastapi import APIRouter
from app.seed.loader import seed_loader
from app.services.careers.career_engine import CareerMatchingEngine
from app.services.ai.factory import get_ai_provider
from app.schemas.careerbridge import UserProfileSchema

router = APIRouter(prefix="/api", tags=["Careers"])
career_engine = CareerMatchingEngine(seed_loader.careers_data)

@router.get("/careers")
def list_careers():
    return {"careers": seed_loader.careers_data}

@router.post("/careers/recommendations")
def get_career_recommendations(user_profile: UserProfileSchema):
    profile_dict = user_profile.model_dump()
    evaluated = career_engine.evaluate_career_fit(profile_dict)
    ai_provider = get_ai_provider()

    for item in evaluated:
        item["explanation"] = ai_provider.generate_career_explanation(
            career_title=item["title"],
            match_score=item["match_score"],
            strengths=item["strengths"],
            gaps=item["gaps"]
        )

    return {"career_recommendations": evaluated}
