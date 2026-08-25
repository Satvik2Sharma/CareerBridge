from abc import ABC, abstractmethod
from typing import Dict, Any, List

class AIProvider(ABC):
    
    @abstractmethod
    def parse_resume_text(self, text: str) -> Dict[str, Any]:
        """Extract structured JSON (skills, education, experience, projects, certifications) from raw text."""
        pass

    @abstractmethod
    def explain_job_match(
        self, job_title: str, match_score: float, matched_skills: List[str], missing_skills: List[str]
    ) -> str:
        """Generate a natural language explanation for why a user matches a job."""
        pass

    @abstractmethod
    def generate_career_explanation(
        self, career_title: str, match_score: float, strengths: List[str], gaps: List[str]
    ) -> str:
        """Generate a natural language explanation for career fit."""
        pass

    @abstractmethod
    def generate_personalized_roadmap(
        self, career_goal: str, current_skills: List[str], missing_skills: List[str]
    ) -> List[Dict[str, Any]]:
        """Generate a week-by-week personalized learning roadmap."""
        pass

    @abstractmethod
    def analyze_msme_business(
        self, business_name: str, business_type: str, current_tech: List[str], challenges: List[str]
    ) -> Dict[str, Any]:
        """Generate MSME digital maturity analysis & recommendation explanations."""
        pass
