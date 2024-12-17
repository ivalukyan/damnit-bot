from pydantic import BaseModel
from uuid import UUID

from sqlalchemy.util import NONE_SET


class UpdateProfileSchema(BaseModel):
    fullname:str
    email: str
    phone: str
    msg: str | None = None


class NewsSchemas(BaseModel):
    id: UUID
    title: str
    short_info: str
    info: str


class UserNewsSchemas(BaseModel):
    user_id: UUID
    news_id: UUID | None = None
    news: list[NewsSchemas] | None = None
    msg: str | None = None


class UserMessagesSchemas(BaseModel):
    chat_id: UUID | None = None
    content: str | None = None
    role: str | None = None


class StoreNotificationsSchema(BaseModel):
    fullname: str | None = None
    email: str | None = None
    phone: str | None = None
    title: str | None = None
    price: str | None = None
    user_id: UUID | None = None
    msg: str | None = None
