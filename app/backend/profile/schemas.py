from pydantic import BaseModel


class UpdateProfileSchema(BaseModel):
    fullname:str
    email: str
    phone: str
    msg: str | None = None