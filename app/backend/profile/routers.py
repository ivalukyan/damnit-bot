from fastapi import APIRouter, Depends, Request

from auth.dependencies import get_current_user
from auth.model import Profile

router = APIRouter(
    tags=["Профиль"],
    prefix="/user"
)


@router.get('/me', response_model=Profile)
async def get_user_data(user: Profile = Depends(get_current_user)):
    return user
