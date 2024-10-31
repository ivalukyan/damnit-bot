from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from starlette.templating import Jinja2Templates

from backend.auth.dependencies import get_current_user
from backend.auth.model import Profile, UserSchemas
from db.database import Users

router = APIRouter(
    tags=["Профиль"],
    prefix="/user"
)

templates = Jinja2Templates(directory="frontend/templates")


@router.get('/profile', response_model=Profile)
async def get_user_data(request: Request, user: Profile = Depends(get_current_user)):
    return user

# @router.get("/profile")
# async def profile_view(request: Request):
#     return templates.TemplateResponse("profile.html", {'request': request})
