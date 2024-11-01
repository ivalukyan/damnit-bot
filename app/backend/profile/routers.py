from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from starlette.templating import Jinja2Templates

from auth.dependencies import get_current_user
from auth.model import Profile, UserSchemas
from db.database import Users

router = APIRouter(
    tags=["Профиль"],
    prefix="/user"
)


@router.get('/me', response_model=Profile)
async def get_user_data(request: Request, user: Profile = Depends(get_current_user)):
    return user

