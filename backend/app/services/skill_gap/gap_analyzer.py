from typing import Dict, Any, List
from app.utils.skill_normalizer import skill_normalizer

class SkillGapEngine:
    def __init__(self, learning_resources: List[Dict[str, Any]] = None):
        self.learning_resources = learning_resources or []

    def analyze_gap(self, user_skills: List[str], target_job: Dict[str, Any]) -> Dict[str, Any]:
        normalized_user = set(skill_normalizer.normalize_list(user_skills))
        req_skills = skill_normalizer.normalize_list(target_job.get("required_skills", []))
        pref_skills = skill_normalizer.normalize_list(target_job.get("preferred_skills", []))

        skill_states = []

        # Process Required Skills
        for skill in req_skills:
            if skill in normalized_user:
                skill_states.append({
                    "skill": skill,
                    "state": "Strong",
                    "badge": "✓",
                    "current_proficiency": "Intermediate / Advanced",
                    "target_proficiency": "Intermediate",
                    "is_required": True
                })
            else:
                # Check if user has a related partial skill
                is_partial = False
                for u_skill in normalized_user:
                    if skill[:4].lower() in u_skill.lower() or u_skill[:4].lower() in skill.lower():
                        is_partial = True
                        break
                
                if is_partial:
                    skill_states.append({
                        "skill": skill,
                        "state": "Partial",
                        "badge": "~",
                        "current_proficiency": "Beginner",
                        "target_proficiency": "Intermediate",
                        "is_required": True,
                        "priority": "MEDIUM",
                        "estimated_effort": "6-10 hours",
                        "why_it_matters": f"Core requirement for {target_job.get('title', 'target role')}."
                    })
                else:
                    skill_states.append({
                        "skill": skill,
                        "state": "Missing",
                        "badge": "✗",
                        "current_proficiency": "None / Beginner",
                        "target_proficiency": "Intermediate",
                        "is_required": True,
                        "priority": "HIGH",
                        "estimated_effort": "12-16 hours",
                        "why_it_matters": f"Mandatory skill required by {target_job.get('title', 'target role')} opportunities."
                    })

        # Process Preferred Skills
        for skill in pref_skills:
            if skill not in req_skills:
                if skill in normalized_user:
                    skill_states.append({
                        "skill": skill,
                        "state": "Strong",
                        "badge": "✓",
                        "current_proficiency": "Intermediate",
                        "target_proficiency": "Intermediate",
                        "is_required": False
                    })
                else:
                    skill_states.append({
                        "skill": skill,
                        "state": "Missing",
                        "badge": "✗",
                        "current_proficiency": "None",
                        "target_proficiency": "Basic",
                        "is_required": False,
                        "priority": "LOW",
                        "estimated_effort": "4-8 hours",
                        "why_it_matters": f"Preferred bonus skill for {target_job.get('title')}."
                    })

        # Sort missing/partial skills into prioritized buckets
        high_priority = [s for s in skill_states if s.get("priority") == "HIGH"]
        med_priority = [s for s in skill_states if s.get("priority") == "MEDIUM"]
        low_priority = [s for s in skill_states if s.get("priority") == "LOW"]

        return {
            "job_id": target_job.get("id"),
            "job_title": target_job.get("title"),
            "all_skill_states": skill_states,
            "prioritized_gaps": {
                "high": high_priority,
                "medium": med_priority,
                "low": low_priority
            }
        }
