from fastapi import APIRouter, Request, HTTPException, status
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.templating import Jinja2Templates

from backend.auth.model import Token, UserSchemas
from backend.auth.utils import create_access_token
from backend.auth.dependencies import authenticate_user, get_db_session, get_user
from db.database import Users
from sqlalchemy.orm import Session

router = APIRouter(
    tags=['Авторизация'],
    prefix="/auth"
)

templates = Jinja2Templates(directory="frontend/templates")

@router.get('/')
async def auth(request: Request):
    return templates.TemplateResponse('auth.html', {'request': request})


@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
                                 db_session: Session = Depends(get_db_session)) -> Token:
    user = authenticate_user(db_session, form_data.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = await create_access_token(data={"sub": form_data.username})

    return Token(access_token=access_token, token_type="bearer")


@router.post("/sign_up", response_model=UserSchemas)
async def sign_up(user: UserSchemas, db_session: Session = Depends(get_db_session)):
    user_db = get_user(db_session, user.phone)
    if user_db:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    user = Users(fullname=user.fullname, phone=user.phone, email=user.email)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    return {"phone": user.phone, "fullname": user.fullname, "email": user.email, "status": "ok", "msg": "User created",
            "content": ""}
