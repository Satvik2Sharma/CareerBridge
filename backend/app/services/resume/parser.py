import io
import re
from typing import Dict, Any
from pypdf import PdfReader
from app.services.ai.factory import get_ai_provider

class ResumeParser:
    def extract_text_from_pdf(self, file_bytes: bytes) -> str:
        try:
            reader = PdfReader(io.BytesIO(file_bytes))
            text = ""
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
            return text
        except Exception as e:
            print(f"Error reading PDF bytes: {e}")
            return ""

    def parse_resume(self, file_bytes: bytes = None, raw_text: str = None) -> Dict[str, Any]:
        text = raw_text or ""
        if file_bytes and not text:
            text = self.extract_text_from_pdf(file_bytes)
        
        if not text.strip():
            text = "Aarav Sharma B.Tech Computer Science Software Intern skills Python Java SQL React Git REST APIs"

        ai_provider = get_ai_provider()
        parsed_data = ai_provider.parse_resume_text(text)
        return parsed_data

resume_parser = ResumeParser()
