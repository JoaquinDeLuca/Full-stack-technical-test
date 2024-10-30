from pydantic import BaseModel, constr, field_validator
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: constr(min_length=3, strip_whitespace=True)  # Al menos 3 caracteres y sin espacios en blanco
    email: constr(strip_whitespace=True, pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')  # Regex para validar el formato del email

    @field_validator('name')
    def name_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('El nombre no puede estar vacío')
        return v

class UserCreate(UserBase):
    pass

# Modelo para actualizar usuarios, hereda de UserBase
class UserUpdate(BaseModel):
    name: Optional[constr(min_length=3, strip_whitespace=True)] = None  # Puede ser None
    email: Optional[constr(strip_whitespace=True, pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')] = None  # Regex para validar el formato del email

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
