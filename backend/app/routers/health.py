from fastapi import APIRouter
from app.config import settings

router = APIRouter(prefix="/api", tags=["Health"])

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app_name": settings.APP_NAME,
        "version": settings.VERSION,
        "ai_provider": settings.AI_PROVIDER,
        "environment": settings.ENVIRONMENT
    }
