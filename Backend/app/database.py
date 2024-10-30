# app/database.py
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from .models.base import Base
from .models.product import Product 
from .models.user import User 

from typing import Annotated

from dotenv import load_dotenv
import os

# Cargar las variables de entorno: .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Crear las tablas en la base de datos
# def init_db():
#     try:
#         Base.metadata.create_all(bind=engine)
#         print("## Tablas creadas exitosamente.")
#     except Exception as e:
#         print("## Ocurrió un error al crear las tablas:")
#         print(f"## Error: {str(e)}")

# Crear las tablas en la base de datos y añadir registros por defecto
def init_db():
    # Crea todas las tablas
    try:
        Base.metadata.create_all(bind=engine)
        print("## Tablas creadas exitosamente.")

        # Iniciar una sesión para insertar datos por defecto
        db: Session = SessionLocal()
        try:
            # Inserción de usuarios por defecto
            existing_users = db.query(User).count()
            if existing_users == 0:  # Solo insertar si no hay usuarios
                users_to_create = [
                    User(name="Juan", email="juan@gmail.com"),
                    User(name="Ana", email="ana@gmail.com"),
                ]
                db.bulk_save_objects(users_to_create)
                db.commit()
                print("## Registros de usuarios por defecto insertados exitosamente.")

            # Inserción de productos por defecto
            existing_products = db.query(Product).count()
            if existing_products == 0:  # Solo insertar si no hay productos
                products_to_create = [
                    Product(name="Coca Cola", description="Dos litros", price=10.99),
                    Product(name="Galletitas terrabusi", description="Un surtido de galletas", price=20.49),
                ]
                db.bulk_save_objects(products_to_create)
                db.commit()
                print("## Registros de productos por defecto insertados exitosamente.")
        except Exception as e:
            print("## Ocurrió un error al insertar registros por defecto:")
            print(f"## Error: {str(e)}")
            db.rollback()  # Deshacer cualquier cambio en caso de error
        finally:
            db.close()  # Cerrar la sesión
    except Exception as e:
        print("## Ocurrió un error al crear las tablas:")
        print(f"## Error: {str(e)}")

# Para ejecutar la base de datos
def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]