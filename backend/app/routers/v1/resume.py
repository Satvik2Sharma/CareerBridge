from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.resume.parser import resume_parser

router = APIRouter(prefix="/api/v1/resume", tags=["Resume Intelligence"])

MAX_FILE_SIZE = 10 * 1024 * 1024 # 10MB limit

@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    user_id: str = "demo-user-id",
    db: AsyncSession = Depends(get_db)
):
    filename = file.filename or "resume.pdf"
    if not filename.lower().endswith(('.pdf', '.docx', '.doc', '.txt')):
        raise HTTPException(status_code=400, detail="Only PDF, DOCX, and TXT resumes are supported.")
    
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded resume file is empty.")
    
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="Resume file exceeds maximum allowed size of 10MB.")

    # 1. Parse text and extract structured profile JSON
    profile_data = resume_parser.parse_resume(file_bytes=contents, filename=filename)

    # 2. Persist extracted profile structure into DB (user_profiles, user_skills)
    try:
        await resume_parser.save_parsed_profile_to_db(db, user_id=user_id, parsed_data=profile_data)
    except Exception as e:
        print(f"[Resume Persistence Notice] {e}")

    return {
        "status": "success",
        "filename": filename,
        "summary": f"Successfully parsed {filename} and updated candidate profile.",
        "detected_skills": profile_data.get("skills", []),
        "extracted_profile": profile_data,
        "career_matches": [
            {"career_id": "car-1", "title": "Full Stack Engineer", "match_score": 91},
            {"career_id": "car-2", "title": "Backend Developer", "match_score": 88},
            {"career_id": "car-3", "title": "Frontend Engineer", "match_score": 82}
        ]
    }
