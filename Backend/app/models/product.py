from sqlalchemy import Column, Integer, String, Numeric, DateTime
from sqlalchemy.sql import func
from .base import Base

class Product(Base):
    __tablename__ = 'products'

    # ID
    id = Column(Integer, primary_key=True, index=True)
    # Campos
    name = Column(String(255), nullable=False)
    description = Column(String(500), nullable=True)
    price = Column(Numeric(10, 2), nullable=False) # Decimal (hasta 10 dígitos en total, 2 decimales)
    created_at = Column(DateTime, default=func.now())
