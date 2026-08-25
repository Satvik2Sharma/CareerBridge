from typing import List, Dict, Any
from app.services.ingestion.base import BaseOpportunitySource

class GovernmentBulletinAdapter(BaseOpportunitySource):
    """Central & State Government Recruitment Bulletin Adapter (UPSC, SSC, IBPS, RRB)"""

    @property
    def source_name(self) -> str:
        return "Government Recruitment Bulletin"

    async def fetch_opportunities(self, limit: int = 20) -> List[Dict[str, Any]]:
        gov_bulletins = [
            {
                "id": "upsc-cse-2026-01",
                "title": "UPSC Civil Services Examination (CSE) 2026",
                "company": "Union Public Service Commission (UPSC)",
                "location": "All India (Cadre Allocation)",
                "work_type": "Onsite",
                "experience_level": "Fresher / Any Graduate",
                "category": "Civil Services & Public Policy",
                "salary_range": "₹6,75,000 - ₹15,00,000 / year (Pay Level 10)",
                "type": "GOVERNMENT_JOB",
                "required_skills": ["Statistics", "Excel", "Digital Marketing"],
                "preferred_skills": [],
                "description": "Recruitment to IAS, IPS, IFS, and Central Group A Services.",
                "source": "UPSC Official Bulletin",
                "source_url": "https://upsc.gov.in/examinations/active-exams",
                "verification_status": "VERIFIED",
                "recruitment_details": {
                    "recruiting_body": "UPSC",
                    "recruitment_name": "Civil Services Examination 2026",
                    "notification_number": "01/2026-CSP",
                    "total_vacancies": 1056,
                    "notification_url": "https://upsc.gov.in",
                    "post_name": "IAS / IPS / Central Services",
                    "degree": "Any Degree",
                    "age_min": 21,
                    "age_max": 32,
                    "experience_years_required": 0
                }
            },
            {
                "id": "ssc-cgl-2026-02",
                "title": "SSC Combined Graduate Level (CGL) 2026 - IT & Technical Officer",
                "company": "Staff Selection Commission (SSC)",
                "location": "New Delhi / Regional Offices",
                "work_type": "Onsite",
                "experience_level": "Fresher / 0-1 years",
                "category": "Software Development",
                "salary_range": "₹5,00,000 - ₹8,50,000 / year (Pay Level 6/7)",
                "type": "GOVERNMENT_JOB",
                "required_skills": ["SQL", "Python", "Git", "REST APIs"],
                "preferred_skills": ["PostgreSQL", "Docker"],
                "description": "IT and Assistant Audit Officer posts across Central Ministries.",
                "source": "SSC Official Bulletin",
                "source_url": "https://ssc.gov.in",
                "verification_status": "VERIFIED",
                "recruitment_details": {
                    "recruiting_body": "SSC",
                    "recruitment_name": "Combined Graduate Level Examination 2026",
                    "notification_number": "HQ-1102/2026",
                    "total_vacancies": 7500,
                    "notification_url": "https://ssc.gov.in",
                    "post_name": "Assistant Section Officer / IT Assistant",
                    "degree": "B.Tech / B.Sc / BCA",
                    "age_min": 18,
                    "age_max": 30,
                    "experience_years_required": 0
                }
            },
            {
                "id": "rrb-ntpc-2026-03",
                "title": "RRB Railway IT & Junior Engineer Recruitment 2026",
                "company": "Railway Recruitment Boards (RRB)",
                "location": "Northern Railway Zone / Roorkee",
                "work_type": "Onsite",
                "experience_level": "Fresher / 0-2 years",
                "category": "Software Development",
                "salary_range": "₹4,50,000 - ₹7,00,000 / year (Pay Level 6)",
                "type": "GOVERNMENT_JOB",
                "required_skills": ["Java", "SQL", "Git", "REST APIs"],
                "preferred_skills": ["Spring Boot", "Docker"],
                "description": "Junior Engineer IT and Signal & Telecommunication Maintenance Officers.",
                "source": "RRB Official Bulletin",
                "source_url": "https://indianrailways.gov.in",
                "verification_status": "VERIFIED",
                "recruitment_details": {
                    "recruiting_body": "RRB",
                    "recruitment_name": "RRB Junior Engineer IT 2026",
                    "notification_number": "CEN 03/2026",
                    "total_vacancies": 3200,
                    "notification_url": "https://indianrailways.gov.in",
                    "post_name": "Junior Engineer (IT)",
                    "degree": "B.Tech / Diploma / BCA",
                    "age_min": 18,
                    "age_max": 33,
                    "experience_years_required": 0
                }
            }
        ]
        return gov_bulletins[:limit]
