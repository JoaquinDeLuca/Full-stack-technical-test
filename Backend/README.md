# Backend FastAPI

## Descripción

Este proyecto es una API RESTful que permite gestionar productos y usuarios. La API incluye funcionalidades para crear, leer, actualizar y eliminar (CRUD) registros de productos y usuarios. Al iniciar la aplicación, se crean automáticamente las tablas necesarias en la base de datos y se cargan dos registros por defecto en cada una.

- ##Tablas creadas exitosamente.
- ##Registros de usuarios por defecto insertados exitosamente.
- ##Registros de productos por defecto insertados exitosamente.

### Funcionalidades

- **Gestión de Productos**
  - Crear, obtener, actualizar y eliminar productos.
- **Gestión de Usuarios**
  - Crear, obtener, actualizar usuarios y eliminar usuarios.

## Requisitos

Para ejecutar este proyecto, asegúrate de tener instalados los siguientes requisitos:

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Un servidor de base de datos (MySQL)

## Instrucciones para Ejecutar el Backend

Para ejecutar el backend de la aplicación, sigue estos pasos:

1. **Posiciónate en la Carpeta del Proyecto**  
   Abre una terminal y navega a la carpeta del proyecto usando el siguiente comando:

   ```bash
   cd Backend
   ```

2. **Crear un Entorno Virtual:**

   crea un entorno virtual con el siguiente comando:

   ```bash
   python -m venv env
   ```

3. **Activar el entorno virtual**  
   Para activar el entorno virtual, utiliza el siguiente comando:
   Windows:
   ```bash
   env/Scripts/activate
   ```
4. **Instala las Dependencias Necesarias:**

   Ejecuta el siguiente comando para instalar las librerías requeridas:

   ```bash
   pip install fastapi uvicorn sqlalchemy pymysql python-dotenv
   ```

5. **Crea un archivo .env**  
   Copia el archivo de ejemplo .env.example y renómbralo a .env. Luego, ajusta los valores según tu configuración.

   ```bash
   DATABASE_URL=mysql+pymysql://user:password@localhost/dbname
   FRONTEND_URL=http://localhost:5173/ ## Default url vite
   ```

6. **Ejecución del Proyecto**  
   Para ejecutar la API, utiliza el siguiente comando:
   ```bash
    uvicorn app.main:app --reload  --port 8001
   ```
