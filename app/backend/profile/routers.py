import json

from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from uuid import UUID

from auth.dependencies import get_current_user, get_db_session
from auth.dependencies import get_user
from auth.model import Profile
from db.database import Users, News, Users_News, Messages, Chats, Store, Notifications
from profile.schemas import (UpdateProfileSchema, UserNewsSchemas,
                             NewsSchemas, UserMessagesSchemas, StoreNotificationsSchema)

router = APIRouter(
    tags=["Профиль"],
    prefix="/user"
)


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    async def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


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


@router.get("/store")
async def get_store_cards(db: Session = Depends(get_db_session)):
    return db.query(Store).all()


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

    print(db.query(Users_News).filter(Users_News.news_id == user_news.news_id).count() == 0)

    if db.query(Users_News).filter(Users_News.news_id == user_news.news_id).count() == 0:
        return UserNewsSchemas(user_id=user_news.user_id, msg="Статья была удалена ранее.")

    news = db.query(Users_News).filter(Users_News.user_id == user_news.user_id
                                       and Users_News.news_id == user_news.news_id).first()

    db.delete(news)
    db.commit()

    return UserNewsSchemas(user_id=user_news.user_id, msg="Статья удалена из избранных.")


@router.post("/store/notification", response_model=StoreNotificationsSchema)
async def send_store_notification(notification: StoreNotificationsSchema, db: Session = Depends(get_db_session)):
    store_not = Notifications(types="store", data=[notification.fullname, notification.phone, notification.email,
                                                   notification.title, notification.price, notification.user_id])
    db.add(store_not)
    db.commit()
    return StoreNotificationsSchema(msg="Сообщение отправлено")


@router.get("/messages/{chat_id}")
async def get_messages(chat_id: str, db: Session = Depends(get_db_session)):
    story = db.query(Messages).filter(Messages.chat_id == chat_id).all()
    return story


@router.post("/messages", response_model=UserMessagesSchemas)
async def save_users_message(message:UserMessagesSchemas, db: Session = Depends(get_db_session)):
    message = Messages(chat_id=message.chat_id, content=message.content, role=message.role)
    db.add(message)
    db.commit()
    return {'chat_id': message.chat_id, 'content': message.content, 'role': message.role}


@router.websocket("/chat/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str, db: Session = Depends(get_db_session)):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{data}")
            mes = json.loads(data)

            message = Messages(chat_id=mes['chat_id'], content=mes['content'], role=mes['role'])
            db.add(message)
            db.commit()

            if db.query(Chats).filter(Chats.chat_id == mes['chat_id']).count() == 0:
                chat = Chats(chat_id=mes['chat_id'], fullname=mes['username'])
                db.add(chat)
                db.commit()

    except Exception as e:
        print(e)
        await manager.disconnect(websocket)