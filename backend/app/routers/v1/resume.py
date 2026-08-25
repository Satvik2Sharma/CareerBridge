from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import Dict, Any
from app.services.resume.parser import parse_resume_pdf

router = APIRouter(prefix="/api/v1/resume", tags=["Resume Intelligence"])

@router.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('.pdf', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF and text resumes are supported.")
    
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    profile_data = parse_resume_pdf(contents, file.filename)
    return profile_data
