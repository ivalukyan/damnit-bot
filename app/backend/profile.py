from fastapi import APIRouter, Depends, Request
from starlette.templating import Jinja2Templates

from backend.auth.model import UserSchemas
from db.database import Users as UsersDB
from backend.auth.dependencies import get_current_user


router = APIRouter(
    tags=["Профиль"]
)

templates = Jinja2Templates(directory="frontend/templates")



@router.get('/profile', response_model=UserSchemas)
async def get_profile_user(request: Request, user: UsersDB = Depends(get_current_user)):
    return templates.TemplateResponse("profile.html", {"request": request, "user": user})