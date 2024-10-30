from sqlalchemy import Column, Integer, String, Numeric, DateTime
from sqlalchemy.sql import func
from .base import Base

class User(Base):
    __tablename__ = 'users'

    # ID
    id = Column(Integer, primary_key=True, index=True)
    # Campos
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)   
    created_at = Column(DateTime, default=func.now())