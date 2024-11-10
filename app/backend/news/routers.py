from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_db_session
from db.database import News, Users, Users_News

router = APIRouter(
    tags=["Новости"],
    prefix="/news"
)


@router.get("/")
async def get_news(db: Session = Depends(get_db_session)):
    all_news = db.query(News).all()
    return all_news