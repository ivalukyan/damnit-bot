from pydantic import BaseModel


class UserForm(BaseModel):
    fullname: str
    phone: str
    contact: str
    email: str | None = None
    message: str | None = None


class CompanyForm(BaseModel):
    fullname: str
    email: str
    message: str | None = None
