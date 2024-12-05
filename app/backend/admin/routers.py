from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from admin.schemas import AdminSchemas
from auth.dependencies import get_current_admin

from auth.dependencies import get_db_session
from db.database import Users, News

from app.backend.admin.schemas import AdminDeleteUser

router = APIRouter(
    prefix="/admin",
    tags=["Админ"]
)


@router.get("/me", response_model=AdminSchemas)
async def get_admin(admin: AdminSchemas = Depends(get_current_admin)):
    return admin


@router.get("/list_users")
async def get_list_users(db: Session = Depends(get_db_session)):
    return db.query(Users).all()


@router.delete("/user/delete", response_model=AdminDeleteUser)
async def delete_user(user: AdminDeleteUser, db: Session = Depends(get_db_session)):
    user = db.query(Users).filter(Users.id == user.user_id).first()
    db.delete(user)
    return {'user_id': user.user_id, 'msg': user.msg}


@router.get("/news")
async def get_news(db: Session = Depends(get_db_session)):
    return db.query(News).all()