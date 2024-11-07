from fastapi import APIRouter, Depends, Request

from auth.dependencies import get_current_user, get_db_session
from auth.model import Profile

from auth.dependencies import get_user
from profile.schemas import UpdateProfileSchema
from sqlalchemy.orm import Session
from db.database import Users


router = APIRouter(
    tags=["Профиль"],
    prefix="/user"
)


@router.get('/me', response_model=Profile)
async def get_user_data(user: Profile = Depends(get_current_user)):
    return user


@router.put('/update', response_model=UpdateProfileSchema)
async def update_user_data(user: UpdateProfileSchema, db: Session = Depends(get_db_session)):

    db.query(Users).filter(Users.phone == user.phone).update({'fullname': user.fullname, 'email': user.email})
    db.commit()
    db.refresh(Users)
    data_user = await get_user(db, user.phone)
    
    return data_user