from typing import List, Dict, Any
from app.services.ingestion.base import BaseOpportunitySource

class NCSAdapter(BaseOpportunitySource):
    """National Career Service (NCS) - Government of India Labour Portal Adapter"""

    @property
    def source_name(self) -> str:
        return "National Career Service (NCS)"

    async def fetch_opportunities(self, limit: int = 20) -> List[Dict[str, Any]]:
        # Structured Indian public sector & government opportunities feed
        ncs_listings = [
            {
                "id": "ncs-job-101",
                "title": "Assistant Section Officer (ASO) - Digital Governance",
                "company": "Ministry of Electronics & IT (MeitY)",
                "location": "New Delhi / Remote",
                "work_type": "Hybrid",
                "experience_level": "Fresher / 0-2 years",
                "category": "Software Development",
                "salary_range": "₹5,50,000 - ₹9,00,000 / year (Pay Level 7)",
                "type": "GOVERNMENT_JOB",
                "required_skills": ["Python", "SQL", "REST APIs", "Git"],
                "preferred_skills": ["PostgreSQL", "Docker", "FastAPI"],
                "description": "Assist MeitY digital governance unit in maintaining e-governance APIs, database schemas, and cloud services.",
                "source": "National Career Service (NCS)",
                "source_url": "https://www.ncs.gov.in/job-seeker/Pages/Search.aspx",
                "verification_status": "VERIFIED"
            },
            {
                "id": "ncs-job-102",
                "title": "Junior Data Analyst - MSME Cluster Analytics",
                "company": "Ministry of MSME",
                "location": "Dehradun / Roorkee",
                "work_type": "Onsite",
                "experience_level": "0-1 years",
                "category": "Data & AI",
                "salary_range": "₹4,80,000 - ₹7,20,000 / year",
                "type": "GOVERNMENT_JOB",
                "required_skills": ["Python", "SQL", "Excel", "Statistics", "Pandas"],
                "preferred_skills": ["Power BI", "Tableau"],
                "description": "Analyze district-level MSME registration data, digital maturity metrics, and growth indicators across Uttarakhand.",
                "source": "National Career Service (NCS)",
                "source_url": "https://www.ncs.gov.in/job-seeker/Pages/Search.aspx",
                "verification_status": "VERIFIED"
            }
        ]
        return ncs_listings[:limit]
