from pydantic import BaseModel
from uuid import UUID


class AdminSchemas(BaseModel):
    id: UUID
    fullname: str
    phone: str
    email: str


class ChatSchemas(BaseModel):
    chat_id: UUID | None = None
    recipient_id: str | None = None
    content: str | None = None
    role: str | None = None


class UserSchemas(BaseModel):
    user_id: UUID | None = None
    fullname: str | None = None
    phone: str | None = None
    email: str | None = None
    msg: str | None = None


class StoreSchemas(BaseModel):
    card_id: UUID | None = None
    title: str | None = None
    short_info: str | None = None
    info: str | None = None
    msg: str | None = None


class NewsSchemas(BaseModel):
    news_id: UUID | None = None
    title: str | None = None
    short_info: str | None = None
    info: str | None = None
    msg: str | None = None