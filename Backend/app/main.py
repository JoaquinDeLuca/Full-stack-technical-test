from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, products
from .database import init_db
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

app = FastAPI()

frontend_url = os.getenv("FRONTEND_URL")

# Configuro los orígenes permitidos
origins = [
    frontend_url,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

# Llama a init_db() al inicio para crear las tablas en la base de datos
@app.on_event("startup")
def startup_event():
    init_db()

# Endpoint para verificar que la aplicación funciona
@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

# Rutas 
app.include_router(products, prefix="/api/products")
app.include_router(users, prefix="/api/users")