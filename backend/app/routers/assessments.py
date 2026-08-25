from fastapi import APIRouter, HTTPException
from app.seed.loader import seed_loader
from app.schemas.careerbridge import AssessmentSubmitRequest

router = APIRouter(prefix="/api", tags=["Assessments"])

@router.get("/assessments")
def list_assessments():
    return {"assessments": seed_loader.assessments_data}

@router.get("/assessments/{assessment_id}")
def get_assessment(assessment_id: str):
    quiz = next((q for q in seed_loader.assessments_data if q.get("id") == assessment_id), None)
    if not quiz:
        raise HTTPException(status_code=404, detail="Assessment quiz not found")
    return quiz

@router.post("/assessments/{assessment_id}/submit")
def submit_assessment(assessment_id: str, payload: AssessmentSubmitRequest):
    quiz = next((q for q in seed_loader.assessments_data if q.get("id") == assessment_id), None)
    if not quiz:
        raise HTTPException(status_code=404, detail="Assessment quiz not found")

    questions = quiz.get("questions", [])
    total_q = len(questions)
    correct_cnt = 0

    for q in questions:
        q_id = q.get("id")
        user_ans = payload.user_answers.get(q_id)
        if user_ans is not None and user_ans == q.get("correct_index"):
            correct_cnt += 1

    score_pct = round((correct_cnt / total_q) * 100.0, 1) if total_q > 0 else 0.0
    passed = score_pct >= 66.0

    readiness_boost = quiz.get("readiness_boost", 5) if passed else 0
    base_readiness = 82.0
    new_readiness = min(100.0, base_readiness + readiness_boost)
    unlocked_jobs = 7 if passed else 0

    return {
        "assessment_id": assessment_id,
        "skill": quiz.get("skill"),
        "passed": passed,
        "score_percentage": score_pct,
        "correct_count": correct_cnt,
        "total_questions": total_q,
        "readiness_boost": readiness_boost,
        "previous_readiness": base_readiness,
        "new_readiness_score": new_readiness,
        "unlocked_opportunities": unlocked_jobs
    }
