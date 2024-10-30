# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .models.base import Base
from .models.product import Product 
from .models.user import User 

from dotenv import load_dotenv
import os

# Cargar las variables de entorno: .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear las tablas en la base de datos
def init_db():
    try:
        Base.metadata.create_all(bind=engine)
        print("## Tablas creadas exitosamente.")
    except Exception as e:
        print("## Ocurrió un error al crear las tablas:")
        print(f"## Error: {str(e)}")