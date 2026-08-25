import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Float, Integer, JSON
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from app.database import Base
from app.config import settings

def generate_uuid():
    return str(uuid.uuid4())

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), unique=True, nullable=False, index=True)
    type = Column(String(50), default="PRIVATE") # PRIVATE, GOVERNMENT, PSU, NGO
    website = Column(String(512), nullable=True)
    location = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    opportunities = relationship("Opportunity", back_populates="organization")

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    type = Column(String(50), default="PRIVATE_JOB", index=True) # PRIVATE_JOB, GOVERNMENT_JOB, INTERNSHIP, APPRENTICESHIP, GIG
    title = Column(String(255), nullable=False, index=True)
    organization_id = Column(String(36), ForeignKey("organizations.id"), nullable=True)
    company_name = Column(String(255), nullable=False)
    career_id = Column(String(36), ForeignKey("careers.id"), nullable=True)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    location = Column(String(255), nullable=True)
    work_type = Column(String(50), default="Hybrid") # Remote, Hybrid, Onsite
    experience_level = Column(String(100), nullable=True)
    experience_min = Column(Float, default=0.0)
    experience_max = Column(Float, default=5.0)
    salary_range = Column(String(100), nullable=True)
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    
    # Provenance & Data Freshness
    source = Column(String(100), default="CareerBridge Seed", index=True) # NCS, Employment News, UPSC, SSC, Adzuna, Jooble, Seed
    source_external_id = Column(String(255), nullable=True, index=True)
    source_url = Column(String(512), nullable=True)
    published_at = Column(DateTime, default=datetime.utcnow)
    application_deadline = Column(DateTime, nullable=True)
    verification_status = Column(String(50), default="VERIFIED") # VERIFIED, UNVERIFIED, EXPIRED

    # Vector Embedding
    embedding = Column(Vector(settings.EMBEDDING_DIMENSIONS), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="opportunities")
    career = relationship("Career", back_populates="opportunities")
    skills = relationship("OpportunitySkill", back_populates="opportunity", cascade="all, delete-orphan")
    government_post = relationship("GovernmentPost", back_populates="opportunity", uselist=False)

class OpportunitySkill(Base):
    __tablename__ = "opportunity_skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    opportunity_id = Column(String(36), ForeignKey("opportunities.id"), nullable=False)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    is_required = Column(String(10), default="true") # "true" or "false"

    opportunity = relationship("Opportunity", back_populates="skills")
    skill = relationship("Skill")
