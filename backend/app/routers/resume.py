from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from app.services.resume.parser import resume_parser

router = APIRouter(prefix="/api", tags=["Resume"])

@router.post("/resume/analyze")
async def analyze_resume(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None)
):
    if not file and not raw_text:
        # Default mock fallback for quick frontend testing
        result = resume_parser.parse_resume(raw_text="Aarav Sharma Software Intern Python Java SQL React Git REST APIs")
        return result

    file_bytes = None
    if file:
        if not file.filename.lower().endswith((".pdf", ".txt")):
            raise HTTPException(status_code=400, detail="Only PDF and TXT files are currently supported.")
        file_bytes = await file.read()

    result = resume_parser.parse_resume(file_bytes=file_bytes, raw_text=raw_text)
    return result
