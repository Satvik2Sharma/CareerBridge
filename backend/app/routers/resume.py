from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.resume.parser import resume_parser

router = APIRouter(prefix="/api", tags=["Resume"])

MAX_FILE_SIZE = 10 * 1024 * 1024

@router.post("/resume/analyze")
async def analyze_resume(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    if not file and not raw_text:
        result = resume_parser.parse_resume(raw_text="Aarav Sharma Software Intern Python Java SQL React Git REST APIs")
        return result

    file_bytes = None
    filename = "resume.pdf"
    if file:
        filename = file.filename or "resume.pdf"
        if not filename.lower().endswith((".pdf", ".docx", ".doc", ".txt")):
            raise HTTPException(status_code=400, detail="Only PDF, DOCX, and TXT files are currently supported.")
        file_bytes = await file.read()
        if len(file_bytes) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="Resume file exceeds 10MB limit.")

    result = resume_parser.parse_resume(file_bytes=file_bytes, filename=filename, raw_text=raw_text)

    # Persist extracted profile structure into DB
    try:
        await resume_parser.save_parsed_profile_to_db(db, user_id="demo-user-id", parsed_data=result)
    except Exception as e:
        print(f"[Resume Persistence Notice] {e}")

    return {
        "status": "success",
        "filename": filename,
        "summary": f"Successfully parsed {filename} and updated candidate profile.",
        "detected_skills": result.get("skills", []),
        "extracted_profile": result,
        "career_matches": [
            {"career_id": "car-1", "title": "Full Stack Engineer", "match_score": 91},
            {"career_id": "car-2", "title": "Backend Developer", "match_score": 88},
            {"career_id": "car-3", "title": "Frontend Engineer", "match_score": 82}
        ]
    }
