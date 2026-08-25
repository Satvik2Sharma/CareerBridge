import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from pgvector.sqlalchemy import Vector
from app.database import Base
from app.config import settings

def generate_uuid():
    return str(uuid.uuid4())

class Skill(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), unique=True, nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    embedding = Column(Vector(settings.EMBEDDING_DIMENSIONS), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    aliases = relationship("SkillAlias", back_populates="skill", cascade="all, delete-orphan")
    parents = relationship("SkillRelationship", foreign_keys="SkillRelationship.child_skill_id", back_populates="child_skill")
    children = relationship("SkillRelationship", foreign_keys="SkillRelationship.parent_skill_id", back_populates="parent_skill")

class SkillAlias(Base):
    __tablename__ = "skill_aliases"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    alias = Column(String(255), unique=True, nullable=False, index=True)

    skill = relationship("Skill", back_populates="aliases")

class SkillRelationship(Base):
    __tablename__ = "skill_relationships"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    parent_skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    child_skill_id = Column(String(36), ForeignKey("skills.id"), nullable=False)
    relationship_type = Column(String(50), default="requires") # requires, relates_to, parent_of

    parent_skill = relationship("Skill", foreign_keys=[parent_skill_id], back_populates="children")
    child_skill = relationship("Skill", foreign_keys=[child_skill_id], back_populates="parents")
