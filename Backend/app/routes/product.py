from fastapi import APIRouter

products = APIRouter()

@products.get("/products")
def read_products():
    return "productos"
