from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.database import Store

from store.schemas import StoreSchemas

from auth.dependencies import get_db_session


router = APIRouter(
    tags=["Магазин"],
    prefix="/store"
)


@router.get("/")
async def get_list_magazin(db: Session = Depends(get_db_session)):

    all_store = db.query(Store).all()

    return all_store