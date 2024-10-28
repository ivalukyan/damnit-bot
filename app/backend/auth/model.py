from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str

class UserSchemas(BaseModel):
    fullname: str | None = None
    phone: str
    email: str | None = None