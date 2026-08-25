from typing import Dict, Any, List
from app.utils.skill_normalizer import skill_normalizer

class JobMatchingEngine:
    """
    Deterministic & Explainable Job Scoring Engine
    Weights:
    - Required Skill Match: 40%
    - Skill Proficiency: 20%
    - Career Goal Alignment: 15%
    - Experience Match: 10%
    - Education Compatibility: 5%
    - Location/Work Preference: 5%
    - Profile Evidence: 5%
    """
    def __init__(self, weights: Dict[str, float] = None):
        if weights is None:
            self.weights = {
                "required_skills": 0.40,
                "proficiency": 0.20,
                "career_goal": 0.15,
                "experience": 0.10,
                "education": 0.05,
                "preference": 0.05,
                "evidence": 0.05,
            }
        else:
            self.weights = weights

    def calculate_match(self, user_profile: Dict[str, Any], job: Dict[str, Any]) -> Dict[str, Any]:
        user_skills = skill_normalizer.normalize_list(user_profile.get("skills", []))
        req_skills = skill_normalizer.normalize_list(job.get("required_skills", []))
        pref_skills = skill_normalizer.normalize_list(job.get("preferred_skills", []))

        # 1. Required Skill Match (40%)
        matched_req = [s for s in req_skills if s in user_skills]
        req_ratio = len(matched_req) / len(req_skills) if req_skills else 1.0
        score_req = req_ratio * 100.0

        # 2. Skill Proficiency & Preferred Skills (20%)
        matched_pref = [s for s in pref_skills if s in user_skills]
        pref_ratio = len(matched_pref) / len(pref_skills) if pref_skills else 0.5
        score_prof = (req_ratio * 0.7 + pref_ratio * 0.3) * 100.0

        # 3. Career Goal Alignment (15%)
        career_goal = user_profile.get("career_goal", "").lower()
        job_title = job.get("title", "").lower()
        job_cat = job.get("category", "").lower()
        
        if career_goal and (career_goal in job_title or career_goal in job_cat):
            score_goal = 100.0
        elif any(part in job_title for part in career_goal.split()):
            score_goal = 80.0
        else:
            score_goal = 60.0

        # 4. Experience Match (10%)
        user_exp = user_profile.get("experience_years", 0)
        job_exp = job.get("experience_level", "")
        
        if "fresher" in job_exp.lower() or "0-1" in job_exp or "0-2" in job_exp:
            score_exp = 100.0 if user_exp <= 2 else 90.0
        else:
            score_exp = 100.0 if user_exp >= 1 else 70.0

        # 5. Education Compatibility (5%)
        user_edu = str(user_profile.get("education", "")).lower()
        score_edu = 100.0 if any(k in user_edu for k in ["b.tech", "cs", "computer", "engineering", "bca", "bsc"]) else 80.0

        # 6. Location / Work Preference (5%)
        work_pref = user_profile.get("work_preference", "Hybrid").lower()
        job_work = job.get("work_type", "Hybrid").lower()
        score_pref = 100.0 if (work_pref in job_work or "remote" in job_work) else 80.0

        # 7. Profile Evidence (Projects & Certifications) (5%)
        projects = user_profile.get("projects", [])
        certs = user_profile.get("certifications", [])
        score_evidence = min(100.0, (len(projects) * 30.0 + len(certs) * 20.0))

        # Weighted final match percentage
        total_score = (
            score_req * self.weights["required_skills"] +
            score_prof * self.weights["proficiency"] +
            score_goal * self.weights["career_goal"] +
            score_exp * self.weights["experience"] +
            score_edu * self.weights["education"] +
            score_pref * self.weights["preference"] +
            score_evidence * self.weights["evidence"]
        )

        missing_skills = [s for s in req_skills if s not in user_skills]

        return {
            "job_id": job.get("id"),
            "job_title": job.get("title"),
            "company": job.get("company"),
            "overall_match": round(total_score, 1),
            "breakdown": {
                "required_skill_match": round(score_req, 1),
                "proficiency_match": round(score_prof, 1),
                "career_goal_alignment": round(score_goal, 1),
                "experience_match": round(score_exp, 1),
                "education_compatibility": round(score_edu, 1),
                "location_preference": round(score_pref, 1),
                "profile_evidence": round(score_evidence, 1)
            },
            "matched_skills": matched_req,
            "matched_preferred_skills": matched_pref,
            "missing_skills": missing_skills
        }
