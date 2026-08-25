from typing import Dict, Any, List
from app.schemas.careerbridge import GovernmentEligibilityRequest, GovernmentEligibilityResponse

CATEGORY_AGE_RELAXATIONS = {
    "GENERAL": 0,
    "EWS": 0,
    "OBC": 3,
    "SC": 5,
    "ST": 5,
    "PWD": 10
}

class GovernmentEligibilityEngine:
    """Evaluates candidate eligibility for Indian Central & State Government Recruitment Posts"""

    def evaluate_eligibility(
        self,
        candidate: GovernmentEligibilityRequest,
        post_details: Dict[str, Any],
        recruitment_details: Dict[str, Any]
    ) -> GovernmentEligibilityResponse:
        reasons = []
        is_eligible = True

        candidate_cat = candidate.category.upper()
        age_relaxation = CATEGORY_AGE_RELAXATIONS.get(candidate_cat, 0)
        
        # Age check
        min_age = post_details.get("age_min", 18)
        max_age = post_details.get("age_max", 30) + age_relaxation
        
        if candidate.age < min_age:
            reasons.append(f"Under minimum age requirement ({min_age} years). Current age: {candidate.age}.")
            is_eligible = False
        elif candidate.age > max_age:
            reasons.append(f"Exceeds maximum age limit for category {candidate_cat} ({max_age} years). Current age: {candidate.age}.")
            is_eligible = False
        else:
            reasons.append(f"✓ Age criteria satisfied ({candidate.age} yrs vs max {max_age} yrs for {candidate_cat}).")

        # Degree check
        required_degree = post_details.get("degree", "").strip()
        if required_degree and required_degree.lower() != "any degree":
            if required_degree.lower() not in candidate.degree.lower() and candidate.degree.lower() not in required_degree.lower():
                reasons.append(f"Degree mismatch. Required: '{required_degree}', Candidate degree: '{candidate.degree}'.")
                is_eligible = False
            else:
                reasons.append(f"✓ Degree requirement satisfied ({candidate.degree}).")
        else:
            reasons.append("✓ Educational qualification criteria satisfied (Any Degree eligible).")

        # Experience check
        exp_required = post_details.get("experience_years_required", 0)
        if candidate.experience_years < exp_required:
            reasons.append(f"Requires minimum {exp_required} years experience. Candidate has {candidate.experience_years} years.")
            is_eligible = False
        elif exp_required > 0:
            reasons.append(f"✓ Experience requirement satisfied ({candidate.experience_years} yrs).")

        status = "ELIGIBLE" if is_eligible else "NOT_ELIGIBLE"
        
        return GovernmentEligibilityResponse(
            status=status,
            recruitment_id=recruitment_details.get("id", "rec-1"),
            post_name=post_details.get("post_name", "Government Officer"),
            recruiting_body=recruitment_details.get("recruiting_body", "UPSC"),
            reasons=reasons,
            official_notification_url=recruitment_details.get("notification_url") or recruitment_details.get("official_apply_url")
        )

government_eligibility_engine = GovernmentEligibilityEngine()
