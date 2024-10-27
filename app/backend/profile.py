from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated

from fastapi.security import OAuth2PasswordBearer

router = APIRouter(tags=["Auth", "Profile"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth")


@router.get('/profile')
async def profile(token: Annotated[str, Depends(oauth2_scheme)]):
    return {"token": token}