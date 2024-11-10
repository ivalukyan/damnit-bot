from fastapi import APIRouter

from application_form.schemas import UserForm, CompanyForm

router = APIRouter(
    prefix="/application_form",
    tags=["Оформление заявки"],
)


@router.post("/person", response_model=UserForm)
async def form_view(user_form: UserForm):
    print(user_form)
    user_form.message = "Оформление заявки успешно"
    return user_form


@router.post("/company", response_model=CompanyForm)
async def form_view(company_form: CompanyForm):
    print(company_form)
    company_form.message = "Оформление заявки успешно"
    return company_form