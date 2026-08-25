from typing import Dict, Any, List
from app.utils.skill_normalizer import skill_normalizer

class CareerMatchingEngine:
    def __init__(self, careers: List[Dict[str, Any]] = None):
        self.careers = careers or []

    def evaluate_career_fit(self, user_profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        user_skills = set(skill_normalizer.normalize_list(user_profile.get("skills", [])))
        results = []

        for career in self.careers:
            req_skills = set(skill_normalizer.normalize_list(career.get("required_skills", [])))
            pref_skills = set(skill_normalizer.normalize_list(career.get("preferred_skills", [])))

            matched_req = req_skills.intersection(user_skills)
            matched_pref = pref_skills.intersection(user_skills)

            req_score = (len(matched_req) / len(req_skills) * 70.0) if req_skills else 50.0
            pref_score = (len(matched_pref) / len(pref_skills) * 30.0) if pref_skills else 15.0
            
            total_match = round(min(98.0, req_score + pref_score), 1)
            missing_skills = list(req_skills.difference(user_skills))

            results.append({
                "career_id": career.get("id"),
                "title": career.get("title"),
                "category": career.get("category"),
                "match_score": total_match,
                "description": career.get("description"),
                "strengths": list(matched_req.union(matched_pref)),
                "gaps": missing_skills,
                "prep_effort_months": career.get("prep_effort_months", "2-4 months"),
                "typical_experience": career.get("typical_experience", "0-2 years"),
                "next_step": f"Build a practical project featuring {missing_skills[0]}" if missing_skills else "Apply directly to top openings."
            })

        # Sort by match score descending
        results.sort(key=lambda x: x["match_score"], reverse=True)
        return results
