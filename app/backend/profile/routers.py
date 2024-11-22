from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user, get_db_session
from auth.dependencies import get_user
from auth.model import Profile
from db.database import Users, News, Users_News
from profile.schemas import UpdateProfileSchema, UserNewsSchemas, NewsSchemas

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


@router.post("/news", response_model=UserNewsSchemas)
async def get_news_user(user_news: UserNewsSchemas, db: Session = Depends(get_db_session)):
    print(user_news)

    news = []

    news_ids = db.query(Users_News).filter(Users_News.user_id == user_news.user_id).all()

    for el in news_ids:
        news_obj = db.query(News).filter(News.id == el.news_id).first()
        if news_obj:
            news_data = NewsSchemas(id=news_obj.id, title=news_obj.title, info=news_obj.info,
                                    short_info=news_obj.short_info)
            news.append(news_data)

    return UserNewsSchemas(user_id=user_news.user_id, news=news)


@router.post("/news_del", response_model=UserNewsSchemas)
async def delete_user_news(user_news: UserNewsSchemas, db: Session = Depends(get_db_session)):

    news = db.query(Users_News).filter(Users_News.user_id == user_news.user_id
                                       and Users_News.news_id == user_news.news_id).first()

    db.delete(news)
    db.commit()

    return UserNewsSchemas(user_id=user_news.user_id, msg="Статья удалена из избранных.")