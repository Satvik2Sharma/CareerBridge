import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer, JSON
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from app.database import Base
from app.config import settings

def generate_uuid():
    return str(uuid.uuid4())

class Career(Base):
    __tablename__ = "careers"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), unique=True, nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    education_expectations = Column(Text, nullable=True)
    typical_experience = Column(String(100), nullable=True)
    prep_effort_months = Column(String(100), nullable=True)
    opportunity_demand = Column(String(50), default="High")
    embedding = Column(Vector(settings.EMBEDDING_DIMENSIONS), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    skills = relationship("CareerSkill", back_populates="career", cascade="all, delete-orphan")
    opportunities = relationship("Opportunity", back_populates="career")

class CareerSkill(Base):
    __tablename__ = "career_skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    career_id = Column(String(36), ForeignKey("careers.id"), nullable=False)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    is_required = Column(String(10), default="true") # "true" or "false"

    career = relationship("Career", back_populates="skills")
    skill = relationship("Skill")
