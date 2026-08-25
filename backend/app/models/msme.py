import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer, Float, JSON
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class BusinessProfile(Base):
    __tablename__ = "business_profiles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    business_type = Column(String(100), nullable=False, index=True)
    owner_name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    employees_count = Column(Integer, default=1)
    monthly_orders = Column(Integer, default=0)
    current_tech = Column(JSON, default=list)
    challenges = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    assessments = relationship("DigitalMaturityAssessment", back_populates="business", cascade="all, delete-orphan")

class DigitalMaturityAssessment(Base):
    __tablename__ = "digital_maturity_assessments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    business_id = Column(String(36), ForeignKey("business_profiles.id"), nullable=False)
    digital_maturity_score = Column(Float, nullable=False)
    category_scores = Column(JSON, nullable=False) # Payments, Inventory, Online Presence, Analytics, Marketing, Cybersecurity
    created_at = Column(DateTime, default=datetime.utcnow)

    business = relationship("BusinessProfile", back_populates="assessments")

class BusinessRecommendation(Base):
    __tablename__ = "business_recommendations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    problem = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    expected_benefit = Column(Text, nullable=False)
    effort = Column(String(50), default="MEDIUM") # LOW, MEDIUM, HIGH
    impact = Column(String(50), default="HIGH") # LOW, MEDIUM, HIGH
    priority = Column(Integer, default=1)
    cost_category = Column(String(100), default="Free")
    created_at = Column(DateTime, default=datetime.utcnow)
