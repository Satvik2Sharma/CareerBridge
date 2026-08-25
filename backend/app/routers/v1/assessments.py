from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Dict, Any

from app.database import get_db
from app.models.learning import Assessment as AssessmentModel, UserAssessmentResult
from app.schemas.careerbridge import (
    AssessmentSchema,
    QuestionSchema,
    AssessmentSubmitRequest,
    AssessmentSubmitResponse
)
from app.seed.loader import seed_loader

router = APIRouter(prefix="/api/v1/assessments", tags=["Skill Assessments & Quizzes"])

@router.get("", response_model=Dict[str, List[AssessmentSchema]])
async def list_assessments(db: AsyncSession = Depends(get_db)):
    stmt = select(AssessmentModel).options(selectinload(AssessmentModel.questions))
    res = await db.execute(stmt)
    ass_list = res.scalars().all()
    if not ass_list:
        return {"assessments": []}

    out = []
    for a in ass_list:
        questions = [
            QuestionSchema(
                id=q.id,
                text=q.question_text,
                options=q.options,
                correct_index=q.correct_index
            )
            for q in a.questions
        ]
        out.append(
            AssessmentSchema(
                id=a.id,
                skill=a.skill_name,
                title=a.title,
                description=a.description or "",
                readiness_boost=a.readiness_boost,
                questions=questions
            )
        )
    return {"assessments": out}

@router.post("/{assessment_id}/submit", response_model=AssessmentSubmitResponse)
async def submit_assessment(
    assessment_id: str,
    req: AssessmentSubmitRequest,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(AssessmentModel).where(AssessmentModel.id == assessment_id).options(selectinload(AssessmentModel.questions))
    res = await db.execute(stmt)
    quiz_obj = res.scalars().first()

    target_quiz = None
    if quiz_obj:
        target_quiz = {
            "id": quiz_obj.id,
            "readiness_boost": quiz_obj.readiness_boost,
            "questions": [
                {"id": q.id, "correct_index": q.correct_index}
                for q in quiz_obj.questions
            ]
        }
    else:
        seed_quizzes = seed_loader.load_assessments()
        fallback = next((a for a in seed_quizzes if a["id"] == assessment_id), None)
        if fallback:
            target_quiz = fallback

    if not target_quiz:
        raise HTTPException(status_code=404, detail=f"Assessment '{assessment_id}' not found.")

    user_answers = req.user_answers
    correct_count = 0
    total_questions = len(target_quiz["questions"])

    for q in target_quiz["questions"]:
        q_id = str(q["id"])
        if q_id in user_answers and user_answers[q_id] == q["correct_index"]:
            correct_count += 1

    percentage = (correct_count / total_questions * 100.0) if total_questions > 0 else 0.0
    passed = percentage >= 60.0
    boost = target_quiz.get("readiness_boost", 5) if passed else 0

    # Persist attempt to database
    try:
        user_result = UserAssessmentResult(
            user_id="usr-1",
            assessment_id=assessment_id,
            score_percentage=round(percentage, 1),
            correct_count=correct_count,
            total_questions=total_questions,
            passed="true" if passed else "false",
            readiness_boost=boost
        )
        db.add(user_result)
        await db.commit()
    except Exception as e:
        print(f"[Assessment Result Persistence Notice] {e}")

    return AssessmentSubmitResponse(
        passed=passed,
        score_percentage=round(percentage, 1),
        correct_count=correct_count,
        total_questions=total_questions,
        readiness_boost=boost,
        new_readiness_score=87.0 if passed else 82.0,
        unlocked_opportunities=3 if passed else 0
    )
