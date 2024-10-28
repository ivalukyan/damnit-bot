from uuid import uuid4

from sqlalchemy import Column, Integer, String, DateTime, UUID, Boolean, LargeBinary

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base


db_url = f"postgresql://postgres:postgres@localhost:5432/damnit_bot"

engine = create_engine(db_url, pool_pre_ping=True, pool_recycle=300)

SessionMaker = sessionmaker(bind=engine)

Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    id = Column(UUID, primary_key=True, default=uuid4)
    fullname = Column(String, nullable=True)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)


if __name__ == '__main__':
    Base.metadata.create_all(engine)