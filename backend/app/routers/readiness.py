from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["Readiness"])

@router.get("/readiness/{user_id}")
def get_user_readiness(user_id: str):
    return {
        "user_id": user_id,
        "user_name": "Aarav Sharma",
        "current_readiness": 82.0,
        "target_readiness": 91.0,
        "unlocked_opportunities_count": 14,
        "skill_proficiency_breakdown": {
            "Python": 100,
            "SQL": 90,
            "React": 85,
            "Java": 80,
            "Spring Boot": 30,
            "Docker": 20
        }
    }
