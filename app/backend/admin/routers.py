from fastapi import APIRouter, Depends
from matplotlib.pyplot import title
from sqlalchemy.orm import Session

from admin.schemas import AdminSchemas
from auth.dependencies import get_current_admin

from auth.dependencies import get_db_session
from db.database import Users, News, Store

from admin.schemas import UserSchemas, StoreSchemas, NewsSchemas

from db.database import Chats

router = APIRouter(
    prefix="/admin",
    tags=["Админ"]
)


@router.get("/me", response_model=AdminSchemas)
async def get_admin(admin: AdminSchemas = Depends(get_current_admin)):
    return admin

# Пользователь
@router.get("/list_users")
async def get_list_users(db: Session = Depends(get_db_session)):
    return db.query(Users).all()


@router.get("/chats")
async def get_chats(db: Session = Depends(get_db_session)):
    return db.query(Chats).all()


@router.delete("/user/delete", response_model=UserSchemas)
async def delete_user(user: UserSchemas, db: Session = Depends(get_db_session)):
    user = db.query(Users).filter(Users.id == user.user_id).first()
    db.delete(user)
    db.commit()
    user.msg = "Пользователь удален"
    return {'user_id': user.user_id, 'msg': user.msg}


@router.put("/user/update", response_model=UserSchemas)
async def update_user(user: UserSchemas, db: Session = Depends(get_db_session)):
    db.query(Users).filter(Users.id == user.user_id).update({'fullname': user.fullname,
                                                             'phone': user.phone,
                                                             'email': user.email})
    db.commit()
    user.msg = "Пользователь обновлен"
    return {'user_id': user.user_id, 'msg': user.msg}


@router.post("/store/get_by_id", response_model=StoreSchemas)
async def get_by_id(card: StoreSchemas, db: Session = Depends(get_db_session)):
    card_store = db.query(Store).filter(Store.id == card.card_id).first()
    return StoreSchemas(card_id=card_store.id, title=card_store.title,
                        short_info=card_store.short_info, info=card_store.info)


@router.post("/store/add", response_model=StoreSchemas)
async def add_store(card: StoreSchemas, db: Session = Depends(get_db_session)):
    card_store = Store(title=card.title, short_info=card.short_info, info=card.info)
    db.add(card_store)
    db.commit()

    return StoreSchemas(msg="Услуга успешно создана")


@router.delete("/store/delete", response_model=StoreSchemas)
async def delete_store(card: StoreSchemas, db: Session = Depends(get_db_session)):
    card_store = db.query(Store).filter(Store.id == card.card_id).first()
    db.delete(card_store)
    db.commit()
    card.msg = "Карточка удалена"
    return {'store_id': card.card_id, 'msg': card.msg}


@router.put("/store/update", response_model=StoreSchemas)
async def update_store(card: StoreSchemas, db: Session = Depends(get_db_session)):
    db.query(Store).filter(Store.id == card.card_id).update({'title': card.title,
                                                              'short_info': card.short_info,
                                                              'info': card.info})
    db.commit()
    card.msg = "Карточка обновлена"
    return {'store_id': card.card_id, 'msg': card.msg}


@router.delete("/news/delete", response_model=NewsSchemas)
async def delete_news(news: NewsSchemas, db: Session = Depends(get_db_session)):
    news = db.query(News).filter(News.id == news.news_id).first()
    db.delete(news)
    db.commit()
    news.msg = "Карточка новости удалена"
    return {'news_id': news.news_id, 'msg': news.msg}


@router.put("/news/update", response_model=NewsSchemas)
async def update_news(news: NewsSchemas, db: Session = Depends(get_db_session)):
    db.query(News).filter(News.id == news.news_id).update({'title': news.title,
                                                           'short_info': news.short_info,
                                                           'info': news.info})
    db.commit()
    news.msg = "Карточка новости обновлена"
    return {'news_id': news.news_id, 'msg': news.msg}


@router.get("/news")
async def get_news(db: Session = Depends(get_db_session)):
    return db.query(News).all()