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

    if user.fullname and user.email:
        db.query(Users).filter(Users.phone == user.phone).update({'fullname': user.fullname, 'email': user.email})
        db.commit()
        data_user = await get_user(db, user.phone)

    return_user = UpdateProfileSchema(fullname=data_user.fullname, email=data_user.email, phone=data_user.phone)
    return_user.msg = "Данные обновлены"
    
    return return_user