from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from typing import List
from ..models.user import User
from ..database import db_dependency
from ..schemas.user import UserResponse, UserCreate, UserUpdate

users = APIRouter()

@users.get("/",response_model=List[UserResponse], status_code=200)
def get_all_users(db: db_dependency):
    try:
        users = db.query(User).all()
        return users
    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e))
    
@users.post("/", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate, db: db_dependency):
    try:
        db_user = User(**user.model_dump())
        db.add(db_user)
        db.commit()
        db.refresh(db_user) 
        return db_user  
    except IntegrityError as e:
        db.rollback()
        # Comprobar si el error es de clave única en el correo electrónico
        if 'Duplicate entry' in str(e.orig):
            detail_message = "Este correo electrónico ya se encuentra registrado."
            raise HTTPException(status_code=400, detail=detail_message)
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"No se pudo crear, Intenten nuevamente {e}")
    
@users.patch("/{user_id}", status_code=200)
def update_product(user_id: int, user_data: UserUpdate, db: db_dependency):
    
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail=f"Producto no encontrado ID: {user_id}")
    
    if user_data.name is not None:
        user.name = user_data.name
    if user_data.email is not None:
        user.email = user_data.email

    db.commit()
    db.refresh(user) 
    
    return user  
    

@users.delete("/{user_id}", status_code=204)
def delete_product(user_id: int, db: db_dependency):

    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail=f"Usuario no encontrado ID: {user_id}")
    
    db.delete(user)
    db.commit()
