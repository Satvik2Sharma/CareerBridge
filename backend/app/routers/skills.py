from fastapi import APIRouter
from app.seed.loader import seed_loader
from app.utils.skill_normalizer import skill_normalizer

router = APIRouter(prefix="/api", tags=["Skills"])

@router.get("/skills")
def get_all_skills():
    return {"skills": seed_loader.skills_data}

@router.post("/skills/normalize")
def normalize_skills(skills: list[str]):
    return {"normalized": skill_normalizer.normalize_list(skills)}
