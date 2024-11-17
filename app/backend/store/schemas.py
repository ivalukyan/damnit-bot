from pydantic import BaseModel
from uuid import UUID


class StoreSchemas(BaseModel):
    id: UUID
    title: str
    info: str
    short_info: str
    msg: str | None = None