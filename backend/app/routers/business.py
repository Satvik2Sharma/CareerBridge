from fastapi import APIRouter
from app.seed.loader import seed_loader
from app.services.business.msme_engine import MSMEEngine
from app.schemas.careerbridge import BusinessProfileSchema

router = APIRouter(prefix="/api", tags=["MSME Business Intelligence"])
msme_engine = MSMEEngine(seed_loader.msme_recommendations)

@router.get("/business/presets")
def get_msme_presets():
    return {"presets": seed_loader.msme_presets}

@router.post("/business/analyze")
def analyze_business(business_profile: BusinessProfileSchema):
    profile_dict = business_profile.model_dump()
    analysis = msme_engine.evaluate_business(profile_dict)
    return analysis

@router.get("/business/{business_id}/digital-maturity")
def get_digital_maturity(business_id: str):
    preset = next((p for p in seed_loader.msme_presets if p.get("name", "").lower().replace(" ", "-") == business_id.lower()), None)
    if preset:
        analysis = msme_engine.evaluate_business(preset)
        return {
            "business_name": preset.get("name"),
            "digital_maturity_score": analysis["digital_maturity_score"],
            "category_scores": analysis["category_scores"]
        }
    
    # Default demo fallback (Local Clothing Store)
    default_preset = seed_loader.msme_presets[0]
    analysis = msme_engine.evaluate_business(default_preset)
    return {
        "business_name": default_preset.get("name"),
        "digital_maturity_score": analysis["digital_maturity_score"],
        "category_scores": analysis["category_scores"]
    }
