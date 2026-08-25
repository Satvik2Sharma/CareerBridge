import json
import os
from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.utils.skill_normalizer import skill_normalizer
from app.services.embedding.factory import embedding_factory
from app.services.ingestion.ncs_adapter import NCSAdapter
from app.services.ingestion.government_bulletin_adapter import GovernmentBulletinAdapter
from app.services.ingestion.adzuna_adapter import AdzunaAdapter

from app.models.skill import Skill, SkillAlias
from app.models.career import Career, CareerSkill
from app.models.opportunity import Organization, Opportunity, OpportunitySkill
from app.models.government import GovernmentRecruitment, GovernmentPost, GovernmentEligibilityRule
from app.models.learning import LearningResource, Assessment, AssessmentQuestion
from app.models.msme import BusinessProfile, DigitalMaturityAssessment, BusinessRecommendation

class IngestionPipeline:
    """Unified Ingestion Pipeline for Ingestion, Normalization, Embedding, and DB Persistence"""

    def __init__(self):
        self.embedding_provider = embedding_factory.get_provider()

    async def ingest_all(self, db: AsyncSession, data_dir: str = settings.DATA_DIR) -> Dict[str, Any]:
        stats = {
            "skills_ingested": 0,
            "careers_ingested": 0,
            "opportunities_ingested": 0,
            "government_recruitments_ingested": 0,
            "learning_resources_ingested": 0,
            "assessments_ingested": 0,
            "msme_recommendations_ingested": 0,
            "embeddings_generated": 0
        }

        # 1. Ingest Skills
        skills_file = os.path.join(data_dir, "skills.json")
        if os.path.exists(skills_file):
            with open(skills_file, "r") as f:
                data = json.load(f)
                for item in data.get("skills", []):
                    canonical_name = skill_normalizer.normalize(item["name"])
                    text_doc = f"Skill: {canonical_name} | Category: {item['category']} | Aliases: {', '.join(item.get('aliases', []))}"
                    vector = await self.embedding_provider.get_embedding(text_doc)
                    stats["embeddings_generated"] += 1

                    # Check existing
                    res = await db.execute(select(Skill).where(Skill.name == canonical_name))
                    skill_obj = res.scalars().first()
                    if not skill_obj:
                        skill_obj = Skill(
                            id=item["id"],
                            name=canonical_name,
                            category=item["category"],
                            embedding=vector
                        )
                        db.add(skill_obj)
                        await db.flush()
                        stats["skills_ingested"] += 1

                        # Add aliases
                        for alias in item.get("aliases", []):
                            alias_clean = alias.strip().lower()
                            db.add(SkillAlias(skill_id=skill_obj.id, alias=alias_clean))

        # 2. Ingest Careers
        careers_file = os.path.join(data_dir, "careers.json")
        if os.path.exists(careers_file):
            with open(careers_file, "r") as f:
                data = json.load(f)
                for item in data.get("careers", []):
                    title = item["title"]
                    req_skills = [skill_normalizer.normalize(s) for s in item.get("required_skills", [])]
                    pref_skills = [skill_normalizer.normalize(s) for s in item.get("preferred_skills", [])]
                    text_doc = f"Career: {title} | Category: {item['category']} | Description: {item['description']} | Skills: {', '.join(req_skills)}"
                    vector = await self.embedding_provider.get_embedding(text_doc)
                    stats["embeddings_generated"] += 1

                    res = await db.execute(select(Career).where(Career.title == title))
                    career_obj = res.scalars().first()
                    if not career_obj:
                        career_obj = Career(
                            id=item["id"],
                            title=title,
                            category=item["category"],
                            description=item["description"],
                            education_expectations=item.get("education_expectations"),
                            typical_experience=item.get("typical_experience"),
                            prep_effort_months=item.get("prep_effort_months"),
                            opportunity_demand=item.get("opportunity_demand", "High"),
                            embedding=vector
                        )
                        db.add(career_obj)
                        await db.flush()
                        stats["careers_ingested"] += 1

        # 3. Ingest Opportunities (Seed JSON + Source Adapters)
        all_opportunities = []
        jobs_file = os.path.join(data_dir, "jobs.json")
        if os.path.exists(jobs_file):
            with open(jobs_file, "r") as f:
                data = json.load(f)
                all_opportunities.extend(data.get("jobs", []))

        # Fetch from Real Data Adapters
        adapters = [NCSAdapter(), GovernmentBulletinAdapter(), AdzunaAdapter()]
        for adapter in adapters:
            try:
                fetched = await adapter.fetch_opportunities(limit=10)
                all_opportunities.extend(fetched)
            except Exception:
                pass

        for item in all_opportunities:
            opp_id = item["id"]
            title = item["title"]
            company = item["company"]
            req_skills = [skill_normalizer.normalize(s) for s in item.get("required_skills", [])]
            
            text_doc = f"Title: {title} | Organization: {company} | Category: {item.get('category')} | Description: {item.get('description')} | Skills: {', '.join(req_skills)}"
            vector = await self.embedding_provider.get_embedding(text_doc)
            stats["embeddings_generated"] += 1

            res = await db.execute(select(Opportunity).where(Opportunity.id == opp_id))
            opp_obj = res.scalars().first()
            if not opp_obj:
                opp_obj = Opportunity(
                    id=opp_id,
                    type=item.get("type", "PRIVATE_JOB"),
                    title=title,
                    company_name=company,
                    career_id=item.get("career_id"),
                    category=item.get("category", "Software Development"),
                    description=item.get("description", ""),
                    location=item.get("location", "Remote"),
                    work_type=item.get("work_type", "Hybrid"),
                    experience_level=item.get("experience_level", "0-2 years"),
                    salary_range=item.get("salary_range", "Competitive"),
                    source=item.get("source", "CareerBridge Seed"),
                    source_url=item.get("source_url"),
                    verification_status=item.get("verification_status", "VERIFIED"),
                    embedding=vector
                )
                db.add(opp_obj)
                await db.flush()
                stats["opportunities_ingested"] += 1

                # If Government recruitment details present
                if "recruitment_details" in item:
                    rd = item["recruitment_details"]
                    rec_res = await db.execute(select(GovernmentRecruitment).where(GovernmentRecruitment.recruitment_name == rd["recruitment_name"]))
                    rec_obj = rec_res.scalars().first()
                    if not rec_obj:
                        rec_obj = GovernmentRecruitment(
                            recruiting_body=rd["recruiting_body"],
                            recruitment_name=rd["recruitment_name"],
                            notification_number=rd.get("notification_number"),
                            total_vacancies=rd.get("total_vacancies", 0),
                            notification_url=rd.get("notification_url")
                        )
                        db.add(rec_obj)
                        await db.flush()
                        stats["government_recruitments_ingested"] += 1

                    post_obj = GovernmentPost(
                        recruitment_id=rec_obj.id,
                        opportunity_id=opp_obj.id,
                        post_name=rd.get("post_name", title),
                        degree=rd.get("degree", "Any Degree"),
                        age_min=rd.get("age_min", 18),
                        age_max=rd.get("age_max", 30),
                        experience_years_required=rd.get("experience_years_required", 0)
                    )
                    db.add(post_obj)

        # 4. Ingest Learning Resources
        res_file = os.path.join(data_dir, "learning_resources.json")
        if os.path.exists(res_file):
            with open(res_file, "r") as f:
                data = json.load(f)
                for item in data.get("resources", []):
                    res = await db.execute(select(LearningResource).where(LearningResource.id == item["id"]))
                    if not res.scalars().first():
                        lr = LearningResource(
                            id=item["id"],
                            skill_name=skill_normalizer.normalize(item["skill"]),
                            title=item["title"],
                            type=item.get("type", "Course"),
                            provider=item.get("provider"),
                            duration=item.get("duration"),
                            difficulty=item.get("difficulty", "Intermediate"),
                            url=item.get("url"),
                            practical_task=item.get("practical_task"),
                            priority=item.get("priority", "HIGH")
                        )
                        db.add(lr)
                        stats["learning_resources_ingested"] += 1

        # 5. Ingest Assessments
        ass_file = os.path.join(data_dir, "assessments.json")
        if os.path.exists(ass_file):
            with open(ass_file, "r") as f:
                data = json.load(f)
                for item in data.get("assessments", []):
                    res = await db.execute(select(Assessment).where(Assessment.id == item["id"]))
                    if not res.scalars().first():
                        ass_obj = Assessment(
                            id=item["id"],
                            skill_name=skill_normalizer.normalize(item["skill"]),
                            title=item["title"],
                            description=item.get("description"),
                            readiness_boost=item.get("readiness_boost", 5)
                        )
                        db.add(ass_obj)
                        await db.flush()
                        stats["assessments_ingested"] += 1

                        for q in item.get("questions", []):
                            q_obj = AssessmentQuestion(
                                id=f"{ass_obj.id}-{q['id']}",
                                assessment_id=ass_obj.id,
                                question_text=q["text"],
                                options=q["options"],
                                correct_index=q["correct_index"]
                            )
                            db.add(q_obj)

        # 6. Ingest MSME Recommendations Catalog
        msme_file = os.path.join(data_dir, "business_recommendations.json")
        if os.path.exists(msme_file):
            with open(msme_file, "r") as f:
                data = json.load(f)
                for item in data.get("recommendations_catalog", []):
                    res = await db.execute(select(BusinessRecommendation).where(BusinessRecommendation.id == item["id"]))
                    if not res.scalars().first():
                        rec_obj = BusinessRecommendation(
                            id=item["id"],
                            title=item["title"],
                            category=item["category"],
                            problem=item["problem"],
                            solution=item["solution"],
                            expected_benefit=item["expected_benefit"],
                            effort=item.get("effort", "MEDIUM"),
                            impact=item.get("impact", "HIGH"),
                            priority=item.get("priority", 1),
                            cost_category=item.get("cost_category", "Free")
                        )
                        db.add(rec_obj)
                        stats["msme_recommendations_ingested"] += 1

        await db.commit()
        return stats

ingestion_pipeline = IngestionPipeline()
