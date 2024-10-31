from fastapi import Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from starlette import status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from auth.model import UserSchemas, Profile
from auth.utils import SECRET_KEY, ALGORITHM
from db.database import Users, SessionMaker
from sqlalchemy.orm import Session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def get_db_session():
    db = SessionMaker()
    try:
        yield db
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    finally:
        db.close()


async def get_user(db_session: Session, phone: str):
    return db_session.query(Users).filter(Users.phone == phone).first()


async def authenticate_user(db_session: Session, phone: str):
    user = await get_user(db_session, phone)
    if not user:
        return None
    return user


async def get_current_user(db_session: Session = Depends(get_db_session), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        phone: str = payload.get("sub")

        if phone is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await get_user(db_session, phone)

    return Profile(id=user.id, fullname=user.fullname, phone=user.phone, email=user.email)


async def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        phone: str = payload.get("sub")
        if not phone:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token")
        return phone
    except JWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid token")