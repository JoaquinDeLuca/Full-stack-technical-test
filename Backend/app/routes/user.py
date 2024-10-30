from fastapi import APIRouter

users = APIRouter()

@users.get("/users")
def read_users():
    return "users endpoint"
