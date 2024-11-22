from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from admin.schemas import AdminSchemas
from auth.dependencies import get_current_admin

router = APIRouter(
    prefix="/admin",
    tags=["Админ"]
)


@router.get("/")
async def get_admin(admin: AdminSchemas = Depends(get_current_admin)):
    return admin