import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer, JSON
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class GovernmentRecruitment(Base):
    __tablename__ = "government_recruitments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    recruiting_body = Column(String(100), nullable=False, index=True) # UPSC, SSC, IBPS, RRB, State PSC
    recruitment_name = Column(String(255), nullable=False)
    notification_number = Column(String(100), nullable=True)
    notification_url = Column(String(512), nullable=True)
    official_apply_url = Column(String(512), nullable=True)
    application_start_date = Column(DateTime, nullable=True)
    application_deadline = Column(DateTime, nullable=True)
    exam_dates = Column(String(255), nullable=True)
    total_vacancies = Column(Integer, default=0)
    selection_process = Column(Text, nullable=True)
    status = Column(String(50), default="ACTIVE") # ACTIVE, UPCOMING, CLOSED
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("GovernmentPost", back_populates="recruitment", cascade="all, delete-orphan")

class GovernmentPost(Base):
    __tablename__ = "government_posts"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    recruitment_id = Column(String(36), ForeignKey("government_recruitments.id"), nullable=False)
    opportunity_id = Column(String(36), ForeignKey("opportunities.id"), nullable=True)
    post_name = Column(String(255), nullable=False)
    department = Column(String(255), nullable=True)
    pay_level = Column(String(50), nullable=True) # Level 6, Level 10, Pay Scale
    vacancies = Column(Integer, default=1)
    education_required = Column(String(255), nullable=True)
    degree = Column(String(255), nullable=True)
    branch = Column(String(255), nullable=True)
    age_min = Column(Integer, default=18)
    age_max = Column(Integer, default=30)
    experience_years_required = Column(Integer, default=0)

    recruitment = relationship("GovernmentRecruitment", back_populates="posts")
    opportunity = relationship("Opportunity", back_populates="government_post")
    eligibility_rules = relationship("GovernmentEligibilityRule", back_populates="post", cascade="all, delete-orphan")

class GovernmentEligibilityRule(Base):
    __tablename__ = "government_eligibility_rules"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    post_id = Column(String(36), ForeignKey("government_posts.id"), nullable=False)
    category = Column(String(50), default="GENERAL") # GENERAL, OBC, SC, ST, EWS, PWD
    age_relaxation_years = Column(Integer, default=0)
    fee_amount = Column(Integer, default=0)
    special_requirements = Column(Text, nullable=True)

    post = relationship("GovernmentPost", back_populates="eligibility_rules")
