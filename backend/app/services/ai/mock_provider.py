from typing import Dict, Any, List
from app.services.ai.base import AIProvider
from app.utils.skill_normalizer import skill_normalizer

class MockAIProvider(AIProvider):
    
    def parse_resume_text(self, text: str) -> Dict[str, Any]:
        text_lower = text.lower()
        extracted_skills = []
        
        # Scan for known skills in text
        for canonical, data in skill_normalizer.canonical_skills.items():
            if canonical.lower() in text_lower:
                extracted_skills.append(canonical)
            else:
                for alias in data.get("aliases", []):
                    if alias.lower() in text_lower:
                        extracted_skills.append(canonical)
                        break

        # Fallback preset if text is sparse or Aarav's resume
        if "aarav" in text_lower or len(extracted_skills) < 3:
            extracted_skills = list(set(extracted_skills + ["Python", "Java", "SQL", "React", "Git", "REST APIs"]))

        education = [
            {
                "degree": "B.Tech in Computer Science & Engineering",
                "institution": "Indian Institute of Technology / Roorkee Tech Institute",
                "year": "2022 - 2026",
                "gpa": "8.4 / 10"
            }
        ]

        experience = [
            {
                "role": "Software Development Intern",
                "company": "TechNova Labs",
                "duration": "June 2025 - August 2025",
                "description": "Developed RESTful APIs in Java & Python, optimized database queries, and integrated Git CI/CD pipelines."
            }
        ]

        projects = [
            {
                "title": "Smart Career Recommendation Engine",
                "technologies": ["Python", "FastAPI", "React", "SQL"],
                "description": "Built an intelligent job compatibility analyzer with deterministic matching engines."
            },
            {
                "title": "E-Commerce Microservices",
                "technologies": ["Java", "REST APIs", "Git"],
                "description": "Designed product catalog APIs with authentication and order management workflows."
            }
        ]

        certifications = ["AWS Certified Cloud Practitioner", "PostgreSQL Database Fundamentals"]

        strengths = [
            "Strong core programming foundation in Java and Python",
            "Practical experience with frontend React and backend REST APIs",
            "Proven software internship and multi-tier project portfolio"
        ]

        weaknesses = [
            "Limited production deployment experience with Docker & Kubernetes",
            "Needs deeper enterprise framework exposure (e.g. Spring Boot)",
            "Lacks statistical data analysis and machine learning depth"
        ]

        suggestions = [
            "Highlight measurable API latency performance gains in your project descriptions.",
            "Add Docker containerization evidence to your GitHub repositories.",
            "Obtain a certification in Spring Boot microservices or Docker."
        ]

        return {
            "name": "Aarav Sharma" if "aarav" in text_lower else "Candidate Profile",
            "email": "aarav.sharma@example.com",
            "skills": skill_normalizer.normalize_list(extracted_skills),
            "education": education,
            "experience": experience,
            "projects": projects,
            "certifications": certifications,
            "analysis": {
                "strengths": strengths,
                "weaknesses": weaknesses,
                "profile_suggestions": suggestions
            }
        }

    def explain_job_match(
        self, job_title: str, match_score: float, matched_skills: List[str], missing_skills: List[str]
    ) -> str:
        matched_str = ", ".join(matched_skills[:4]) if matched_skills else "general profile background"
        missing_str = ", ".join(missing_skills[:3]) if missing_skills else "none"
        
        if match_score >= 85:
            return (
                f"Exceptional match for {job_title}! Your verified background in {matched_str} aligns directly with "
                f"the core requirements of this role. Bridging minor gaps in {missing_str} will position you as a top-tier candidate."
            )
        elif match_score >= 70:
            return (
                f"Strong potential for {job_title}. You possess solid fundamentals in {matched_str}. "
                f"Acquiring skills in {missing_str} will significantly boost your interview callback rate."
            )
        else:
            return (
                f"Partial match for {job_title}. While your skills in {matched_str} provide a partial baseline, "
                f"the role heavily requires {missing_str}."
            )

    def generate_career_explanation(
        self, career_title: str, match_score: float, strengths: List[str], gaps: List[str]
    ) -> str:
        strengths_str = ", ".join(strengths[:3]) if strengths else "programming fundamentals"
        gaps_str = ", ".join(gaps[:2]) if gaps else "advanced frameworks"
        return (
            f"The {career_title} path has a {match_score:.0f}% alignment with your career trajectory. "
            f"Your current strengths in {strengths_str} offer an excellent foundation. Focus on building competence "
            f"in {gaps_str} to complete your transition."
        )

    def generate_personalized_roadmap(
        self, career_goal: str, current_skills: List[str], missing_skills: List[str]
    ) -> List[Dict[str, Any]]:
        roadmap = []
        week = 1
        
        # Notice: skips skills the user already knows!
        for skill in missing_skills:
            if skill in ["Spring Boot", "FastAPI"]:
                roadmap.append({
                    "week": week,
                    "skill": skill,
                    "title": f"Mastering Enterprise Backend with {skill}",
                    "objective": f"Understand dependency injection, REST controllers, and database persistence in {skill}.",
                    "duration": "12-14 hours",
                    "difficulty": "Intermediate",
                    "resources": [
                        {"title": f"{skill} Official Tutorial", "type": "Documentation", "url": "https://docs.example.com"}
                    ],
                    "practical_task": f"Build a multi-entity CRUD API service using {skill}.",
                    "status": "pending"
                })
                week += 1
            elif skill in ["Docker", "Kubernetes", "CI/CD"]:
                roadmap.append({
                    "week": week,
                    "skill": skill,
                    "title": f"DevOps & Containerization with {skill}",
                    "objective": f"Learn how to containerize services and automate builds with {skill}.",
                    "duration": "8-10 hours",
                    "difficulty": "Intermediate",
                    "resources": [
                        {"title": f"{skill} Hands-on Guide", "type": "Workshop", "url": "https://docs.example.com"}
                    ],
                    "practical_task": f"Write a production container configuration for your web application.",
                    "status": "pending"
                })
                week += 1
            elif skill in ["Pandas", "Statistics", "Machine Learning"]:
                roadmap.append({
                    "week": week,
                    "skill": skill,
                    "title": f"Data Science Fundamentals: {skill}",
                    "objective": f"Apply statistical algorithms and data wrangling techniques using {skill}.",
                    "duration": "10-15 hours",
                    "difficulty": "Intermediate",
                    "resources": [
                        {"title": f"Applied {skill} Masterclass", "type": "Course", "url": "https://docs.example.com"}
                    ],
                    "practical_task": f"Analyze a 50k dataset and output statistical distributions.",
                    "status": "pending"
                })
                week += 1
            else:
                roadmap.append({
                    "week": week,
                    "skill": skill,
                    "title": f"Core Competency in {skill}",
                    "objective": f"Gain hands-on proficiency in {skill} required for {career_goal}.",
                    "duration": "8-10 hours",
                    "difficulty": "Beginner-Intermediate",
                    "resources": [
                        {"title": f"{skill} Foundations", "type": "Guide", "url": "https://docs.example.com"}
                    ],
                    "practical_task": f"Complete mini-project demonstrating {skill} usage.",
                    "status": "pending"
                })
                week += 1
                
        # Final capstone step
        roadmap.append({
            "week": week,
            "skill": "Portfolio Capstone",
            "title": f"Build & Deploy Full {career_goal} Portfolio Project",
            "objective": "Combine all newly acquired skills into a production-grade portfolio project.",
            "duration": "15-20 hours",
            "difficulty": "Advanced",
            "resources": [{"title": "Portfolio Showcase Guide", "type": "Article", "url": "https://docs.example.com"}],
            "practical_task": "Publish open-source GitHub repository with README, live demo link, and architecture diagram.",
            "status": "pending"
        })

        return roadmap

    def analyze_msme_business(
        self, business_name: str, business_type: str, current_tech: List[str], challenges: List[str]
    ) -> Dict[str, Any]:
        tech_lower = [t.lower() for t in current_tech]
        
        # Calculate digital maturity deterministically
        scores = {
            "Payments": 80 if any(k in tech_lower for k in ["upi", "digital payments", "pos", "qr"]) else 30,
            "Inventory": 80 if any(k in tech_lower for k in ["vyapar", "khatabook", "zoho", "inventory app"]) else 20,
            "Online Presence": 70 if any(k in tech_lower for k in ["website", "online store", "whatsapp store", "instagram"]) else 30,
            "Analytics": 60 if any(k in tech_lower for k in ["excel", "crm", "analytics"]) else 10,
            "Marketing": 70 if any(k in tech_lower for k in ["facebook ads", "google business", "social media"]) else 40,
            "Cybersecurity": 50 if any(k in tech_lower for k in ["antivirus", "cloud backup"]) else 30
        }

        overall = round(sum(scores.values()) / len(scores))

        return {
            "business_name": business_name,
            "business_type": business_type,
            "digital_maturity_score": overall,
            "category_scores": scores,
            "growth_opportunities": [
                "Automate stock management to prevent out-of-stock losses during peak customer hours.",
                "Establish a direct WhatsApp catalog store to capture local neighborhood orders.",
                "Launch targeted Google Business profile optimization for local discovery in Roorkee."
            ]
        }
