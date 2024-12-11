from pydantic import BaseModel
from uuid import UUID


class AdminSchemas(BaseModel):
    id: UUID
    fullname: str
    phone: str
    email: str


class UserSchemas(BaseModel):
    user_id: UUID
    fullname: str | None
    phone: str | None
    email: str | None
    msg: str | None = None


class StoreSchemas(BaseModel):
    card_id: UUID | None = None
    title: str | None = None
    short_info: str | None = None
    info: str | None = None
    msg: str | None = None


class NewsSchemas(BaseModel):
    news_id: UUID
    title: str | None = None
    short_info: str | None = None
    info: str | None = None
    msg: str | None = None