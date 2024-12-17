from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from admin.schemas import AdminSchemas
from auth.dependencies import get_current_admin

from auth.dependencies import get_db_session
from db.database import Users, News, Store, Notifications, Stats

from admin.schemas import UserSchemas, StoreSchemas, NewsSchemas, ChatSchemas, NotificationSchemas

from db.database import Chats, Messages

from datetime import datetime

router = APIRouter(
    prefix="/admin",
    tags=["Админ"]
)


@router.get("/me", response_model=AdminSchemas)
async def get_admin(admin: AdminSchemas = Depends(get_current_admin)):
    return admin


@router.post("/messages", response_model=ChatSchemas)
async def save_chat(chat: ChatSchemas, db: Session = Depends(get_db_session)):
    message = Messages(chat_id=chat.chat_id, content=chat.content, role=chat.role)
    db.add(message)
    db.commit()
    return ChatSchemas(chat_id=chat.chat_id, content=chat.content, role=chat.role)


# Пользователь
@router.get("/list_users")
async def get_list_users(db: Session = Depends(get_db_session)):
    return db.query(Users).all()


@router.get("/chats")
async def get_chats(db: Session = Depends(get_db_session)):
    return db.query(Chats).all()


@router.get("/user/count")
async def get_user_count(db: Session = Depends(get_db_session)):

    now_year = datetime.now().year
    now_month = datetime.now().month

    stats_month = db.query(Stats).filter(Stats.year == now_year).first()
    if stats_month is None:
        cnt_users = db.query(Users).count()
        arr = (now_month-1)*[0]+[cnt_users]
        db.add(Stats(year=now_year, data=arr, month=now_month))
        db.commit()
        return {'data': arr}


    if stats_month.month != now_month:
        old_data = db.query(Stats).filter(Stats.year == now_year).first()
        count_users = db.query(Users).count()
        arr = old_data.data + [count_users]
        db.query(Stats).filter(Stats.year == now_year).update({'data': arr, 'month': now_month})
        db.commit()
        return {'data': arr}

    if stats_month.data[now_month-1] != db.query(Users).count():
        cnt_users = db.query(Users).count()
        arr = stats_month.data
        arr[now_month-1] = cnt_users
        db.query(Stats).filter(Stats.year == now_year).update({'data': arr})
        db.commit()
        return {'data': arr}

    return {'data': stats_month.data}


@router.post("/user/get_by_id", response_model=UserSchemas)
async def get_user_by_id(user: UserSchemas, db: Session = Depends(get_db_session)):
    user_db = db.query(Users).filter(Users.id == user.user_id).first()
    return UserSchemas(id=user_db.id, fullname=user_db.fullname, email=user_db.email, phone=user_db.phone)


@router.delete("/user/delete", response_model=UserSchemas)
async def delete_user(user: UserSchemas, db: Session = Depends(get_db_session)):
    user_db = db.query(Users).filter(Users.id == user.user_id).first()
    db.delete(user_db)
    db.commit()
    user.msg = "Пользователь удален"
    return {'user_id': user_db.id, 'msg': user.msg}


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


@router.get("/store/notifications")
async def get_stores_notification(db: Session = Depends(get_db_session)):
    return db.query(Notifications).filter(Notifications.types == "store").all()


@router.post("/store/notifications/approve", response_model=NotificationSchemas)
async def approve_store(notification: NotificationSchemas, db: Session = Depends(get_db_session)):

    notifications = db.query(Notifications).filter(Notifications.id == notification.notification_id).first()
    db.delete(notifications)
    db.commit()

    chat_story = Messages(chat_id=notification.chat_id, content=notification.msg, role="admin")
    db.add(chat_story)
    db.commit()

    return NotificationSchemas(msg="Заказа обработан")


@router.post("/store/notifications/rejection", response_model=NotificationSchemas)
async def approve_store(notification: NotificationSchemas, db: Session = Depends(get_db_session)):

    notifications = db.query(Notifications).filter(Notifications.id == notification.notification_id).first()
    db.delete(notifications)
    db.commit()

    return NotificationSchemas(msg="Заказ откланен")


@router.post("/news/get_by_id", response_model=NewsSchemas)
async def get_by_id_news(news: NewsSchemas, db: Session = Depends(get_db_session)):
    news_card = db.query(News).filter(News.id == news.news_id).first()
    return NewsSchemas(card_id=news_card.id, title=news_card.title,
                        short_info=news_card.short_info, info=news_card.info)


@router.post("/news/add", response_model=NewsSchemas)
async def add_news(news: NewsSchemas, db: Session = Depends(get_db_session)):
    card_news = News(title=news.title, short_info=news.short_info, info=news.info)
    db.add(card_news)
    db.commit()

    return StoreSchemas(msg="Услуга успешно создана")


@router.delete("/news/delete", response_model=NewsSchemas)
async def delete_news(news: NewsSchemas, db: Session = Depends(get_db_session)):
    news_card = db.query(News).filter(News.id == news.news_id).first()
    db.delete(news_card)
    db.commit()
    news.msg = "Карточка новости удалена"
    return {'news_id': news_card.id, 'msg': news.msg}


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


@router.get("/notifications")
async def get_notifications(db: Session = Depends(get_db_session)):
    return db.query(Notifications).filter(Notifications.types == "new_user").all()


@router.post("/notifications/approve", response_model=UserSchemas)
async def approve_user(user: UserSchemas, db: Session = Depends(get_db_session)):
    user_approved = Users(fullname=user.fullname, phone=user.phone, email=user.email)
    db.add(user_approved)
    db.commit()

    notifications = db.query(Notifications).filter(Notifications.id == user.user_id).first()
    db.delete(notifications)
    db.commit()

    return UserSchemas(msg="Пользователь добавлен")


@router.post("/notifications/rejection", response_model=UserSchemas)
async def abort_user(user: UserSchemas, db: Session = Depends(get_db_session)):
    user_rejected = db.query(Notifications).filter(Notifications.id == user.user_id).first()
    db.delete(user_rejected)
    db.commit()

    return UserSchemas(msg="Пользователь откланен")