from pydantic import BaseModel
from uuid import UUID


class User_News(BaseModel):
    user_id: UUID
    news_id: UUID
    msg: str | None = None