from pydantic import BaseModel
from uuid import UUID


class AdminSchemas(BaseModel):
    id: UUID
    fullname: str
    phone: str
    email: str


class AdminDeleteUser(BaseModel):
    user_id: UUID
    msg: str | None = None