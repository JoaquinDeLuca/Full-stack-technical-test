from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from typing import List
from ..models.product import Product
from ..schemas.product import ProductResponse, ProductCreate, ProductUpdate
from ..database import db_dependency

products = APIRouter()

@products.get("/",response_model=List[ProductResponse], status_code=200)
def get_products(db: db_dependency):
    try:
        products = db.query(Product).all()
        return products
    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e))

@products.post("/", response_model=dict, status_code=201)
def create_product(product: ProductCreate, db: db_dependency):
    try:
        db_product = Product(**product.model_dump()) 
        db.add(db_product) 
        db.commit()  
        db.refresh(db_product)  # Actualizo el objeto con datos del DB

        serialized_product = ProductResponse.model_validate(db_product).model_dump()

        response = {
            "data": serialized_product,
            "status_code": 201,
            "error": False
        }

        return response 
    except SQLAlchemyError as e:
        db.rollback() 
        raise HTTPException(status_code=400, detail=f"No se pudo crear, Intenten nuevamente {e}") 

@products.patch("/{product_id}", status_code=200)
def update_product(product_id: int, product_data: ProductUpdate, db: db_dependency):
    # Buscar el producto por ID
    product = db.query(Product).filter(Product.id == product_id).first()
    
    # Verifico si el producto existe
    if not product:
        raise HTTPException(status_code=404, detail=f"Producto no encontrado ID: {product_id}")
    
    # Actualizo solo los campos que recibimos
    if product_data.name is not None:
        product.name = product_data.name
    if product_data.description is not None:
        product.description = product_data.description
    if product_data.price is not None:
        product.price = product_data.price

    db.commit()
    db.refresh(product)  # Refrescar para obtener el objeto actualizado
    
    return product  

@products.delete("/{product_id}", status_code=204)
def delete_product(product_id: int, db: db_dependency):

    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(status_code=404, detail=f"Producto no encontrado ID: {product_id}")
    
    db.delete(product)
    db.commit()
