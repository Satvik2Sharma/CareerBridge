from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.seed.loader import seed_loader
from app.services.matching.scoring_engine import JobMatchingEngine
from app.services.skill_gap.gap_analyzer import SkillGapEngine
from app.services.ai.factory import get_ai_provider
from app.schemas.careerbridge import UserProfileSchema

router = APIRouter(prefix="/api", tags=["Jobs"])

matching_engine = JobMatchingEngine()
skill_gap_engine = SkillGapEngine(seed_loader.resources_data)

@router.get("/jobs")
def list_jobs(category: Optional[str] = None):
    jobs = seed_loader.jobs_data
    if category:
        jobs = [j for j in jobs if j.get("category", "").lower() == category.lower()]
    return {"jobs": jobs, "total": len(jobs)}

@router.get("/jobs/{job_id}")
def get_job_details(job_id: str):
    for job in seed_loader.jobs_data:
        if job.get("id") == job_id:
            return job
    raise HTTPException(status_code=404, detail="Job not found")

@router.post("/jobs/recommendations")
def get_job_recommendations(user_profile: UserProfileSchema):
    profile_dict = user_profile.model_dump()
    all_jobs = seed_loader.jobs_data
    ai_provider = get_ai_provider()

    results = []
    for job in all_jobs:
        match_info = matching_engine.calculate_match(profile_dict, job)
        
        # Natural language AI explanation
        explanation = ai_provider.explain_job_match(
            job_title=job.get("title"),
            match_score=match_info["overall_match"],
            matched_skills=match_info["matched_skills"],
            missing_skills=match_info["missing_skills"]
        )
        match_info["explanation"] = explanation
        match_info["job_details"] = job
        results.append(match_info)

    # Sort by match percentage descending
    results.sort(key=lambda x: x["overall_match"], reverse=True)
    
    # Top 5 by default
    top_5 = results[:5]

    return {
        "top_recommendations": top_5,
        "all_recommendations": results,
        "total_evaluated": len(results)
    }

@router.get("/jobs/{job_id}/skill-gap")
def get_job_skill_gap(job_id: str, user_skills: Optional[str] = Query(default="Python,Java,SQL,React,Git,REST APIs")):
    job = next((j for j in seed_loader.jobs_data if j.get("id") == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    parsed_user_skills = [s.strip() for s in user_skills.split(",") if s.strip()]
    gap_result = skill_gap_engine.analyze_gap(parsed_user_skills, job)
    return gap_result
