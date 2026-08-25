import json
import httpx
from typing import Dict, Any, List
from app.config import settings
from app.services.ai.base import AIProvider
from app.services.ai.mock_provider import MockAIProvider

class OpenAICompatibleProvider(AIProvider):
    def __init__(self):
        self.mock_fallback = MockAIProvider()
        self.api_key = settings.AI_API_KEY
        self.base_url = settings.AI_BASE_URL
        self.model = settings.AI_MODEL

    def _call_llm(self, prompt: str, system_prompt: str = "You are an expert AI Career and Business Intelligence Advisor.") -> str:
        if not self.api_key:
            raise ValueError("AI_API_KEY is not configured.")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.3
        }

        with httpx.Client(timeout=15.0) as client:
            res = client.post(f"{self.base_url}/chat/completions", headers=headers, json=payload)
            res.raise_for_status()
            data = res.json()
            return data["choices"][0]["message"]["content"]

    def parse_resume_text(self, text: str) -> Dict[str, Any]:
        try:
            prompt = f"Parse the following resume text into JSON with keys: name, email, skills (array), education (array), experience (array), projects (array), certifications (array), analysis (object with strengths, weaknesses, profile_suggestions arrays):\n\n{text[:3000]}"
            raw = self._call_llm(prompt, "You return strictly valid JSON.")
            # Remove ```json wrappers if present
            clean = raw.replace("```json", "").replace("```", "").strip()
            return json.loads(clean)
        except Exception as e:
            print(f"OpenAI parse_resume_text failed, using mock fallback: {e}")
            return self.mock_fallback.parse_resume_text(text)

    def explain_job_match(
        self, job_title: str, match_score: float, matched_skills: List[str], missing_skills: List[str]
    ) -> str:
        try:
            prompt = f"Write a 2-sentence explanation for a job applicant matching '{job_title}' with a score of {match_score}%. Matched skills: {matched_skills}. Missing skills: {missing_skills}."
            return self._call_llm(prompt)
        except Exception:
            return self.mock_fallback.explain_job_match(job_title, match_score, matched_skills, missing_skills)

    def generate_career_explanation(
        self, career_title: str, match_score: float, strengths: List[str], gaps: List[str]
    ) -> str:
        try:
            prompt = f"Write a concise explanation why the career path '{career_title}' has a {match_score}% fit based on strengths: {strengths} and gaps: {gaps}."
            return self._call_llm(prompt)
        except Exception:
            return self.mock_fallback.generate_career_explanation(career_title, match_score, strengths, gaps)

    def generate_personalized_roadmap(
        self, career_goal: str, current_skills: List[str], missing_skills: List[str]
    ) -> List[Dict[str, Any]]:
        try:
            prompt = f"Generate a JSON array of weekly learning roadmap items for career '{career_goal}'. Skip current skills: {current_skills}. Focus on missing skills: {missing_skills}."
            raw = self._call_llm(prompt, "Return strictly valid JSON array of objects with keys: week, skill, title, objective, duration, difficulty, resources, practical_task, status.")
            clean = raw.replace("```json", "").replace("```", "").strip()
            return json.loads(clean)
        except Exception:
            return self.mock_fallback.generate_personalized_roadmap(career_goal, current_skills, missing_skills)

    def analyze_msme_business(
        self, business_name: str, business_type: str, current_tech: List[str], challenges: List[str]
    ) -> Dict[str, Any]:
        try:
            prompt = f"Analyze business '{business_name}' ({business_type}). Current tech: {current_tech}, challenges: {challenges}. Return JSON with digital_maturity_score, category_scores, and growth_opportunities."
            raw = self._call_llm(prompt, "Return strictly valid JSON.")
            clean = raw.replace("```json", "").replace("```", "").strip()
            return json.loads(clean)
        except Exception:
            return self.mock_fallback.analyze_msme_business(business_name, business_type, current_tech, challenges)
