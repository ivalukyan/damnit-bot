from pydantic import BaseModel
from uuid import UUID


class Token(BaseModel):
    access_token: str
    token_type: str

class UserSchemas(BaseModel):
    fullname: str | None = None
    phone: str
    email: str | None = None


class Profile(BaseModel):
    id: UUID
    fullname: str
    phone: str
    email: str