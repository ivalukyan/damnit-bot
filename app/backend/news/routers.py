from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_db_session
from db.database import News, Users, Users_News
from news.schemas import User_News

router = APIRouter(
    tags=["Новости"],
    prefix="/news"
)


@router.get("/")
async def get_news(db: Session = Depends(get_db_session)):
    all_news = db.query(News).all()
    return all_news


@router.post("/save", response_model=User_News)
async def save_news(user_news: User_News, db: Session = Depends(get_db_session)):

    save_data = Users_News(user_id=user_news.user_id, news_id=user_news.news_id)
    db.add(save_data)
    db.commit()
    db.refresh(save_data)

    user_news.msg = "Статья сохранена."

    return user_news