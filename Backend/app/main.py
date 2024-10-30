from fastapi import FastAPI
from .routes import users, products
from .database import init_db

app = FastAPI()

# Llama a init_db() al inicio para crear las tablas en la base de datos
@app.on_event("startup")
def startup_event():
    init_db()

# Endpoint para verificar que la aplicación funciona
@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

# Rutas 
app.include_router(products)
app.include_router(users)