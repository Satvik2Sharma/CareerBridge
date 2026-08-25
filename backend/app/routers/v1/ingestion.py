from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any

from app.database import get_db
from app.services.ingestion.pipeline import ingestion_pipeline

router = APIRouter(prefix="/api/v1/ingestion", tags=["Data Ingestion Pipeline"])

@router.post("/run", response_model=Dict[str, Any])
async def run_ingestion_pipeline(db: AsyncSession = Depends(get_db)):
    stats = await ingestion_pipeline.ingest_all(db)
    return {
        "status": "success",
        "message": "CareerBridge Data Ingestion Pipeline executed successfully.",
        "execution_stats": stats
    }
