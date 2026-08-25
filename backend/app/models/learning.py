import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer, JSON
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from app.database import Base
from app.config import settings

def generate_uuid():
    return str(uuid.uuid4())

class LearningResource(Base):
    __tablename__ = "learning_resources"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    skill_name = Column(String(255), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    type = Column(String(100), default="Course") # Interactive Course, Workshop, Tutorial
    provider = Column(String(255), nullable=True)
    duration = Column(String(100), nullable=True)
    difficulty = Column(String(100), default="Intermediate")
    url = Column(String(512), nullable=True)
    practical_task = Column(Text, nullable=True)
    priority = Column(String(50), default="HIGH")
    embedding = Column(Vector(settings.EMBEDDING_DIMENSIONS), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    skill_name = Column(String(255), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    readiness_boost = Column(Integer, default=5)
    created_at = Column(DateTime, default=datetime.utcnow)

    questions = relationship("AssessmentQuestion", back_populates="assessment", cascade="all, delete-orphan")

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    assessment_id = Column(String(36), ForeignKey("assessments.id"), nullable=False)
    question_text = Column(Text, nullable=False)
    options = Column(JSON, nullable=False) # List of option strings
    correct_index = Column(Integer, nullable=False)

    assessment = relationship("Assessment", back_populates="questions")
