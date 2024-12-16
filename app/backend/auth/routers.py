from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from auth.dependencies import authenticate_user, get_db_session, get_user, authenticate_admin
from auth.model import Token, UserSchemas
from auth.utils import create_access_token
from db.database import Notifications

router = APIRouter(
    tags=['Авторизация'],
    prefix="/auth"
)

@router.get('/')
async def auth():
    return {"message": "it`s auth page"}


@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                                 db_session: Session = Depends(get_db_session)) -> Token:
    user = await authenticate_user(db_session, form_data.username)
    admin = await authenticate_admin(db_session, form_data.username)
    if not user and not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = await create_access_token(data={"sub": form_data.username})

    return Token(access_token=access_token, token_type="bearer")


@router.post("/sign_up", response_model=UserSchemas)
async def sign_up(user: UserSchemas, db_session: Session = Depends(get_db_session)):
    user_db = await get_user(db_session, user.phone)
    if user_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    notification = Notifications(types="new_user",
                                 data=[user.fullname, user.email, user.phone],
                                 msg="Новый пользователь")
    db_session.add(notification)
    db_session.commit()
    db_session.refresh(notification)

    #access_token = await create_access_token(data={"sub": user.phone})

    return UserSchemas(fullname=user.fullname,
                       phone=user.phone,
                       email=user.email,
                       msg="Запрос на регистрацию отправлен")
