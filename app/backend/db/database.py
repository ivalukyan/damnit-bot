from uuid import uuid4, UUID

from fastapi.params import Depends
from pygments.lexer import default
from sqlalchemy import Column, Integer, String, DateTime, UUID, Boolean, LargeBinary, ForeignKey

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship, Session
from sqlalchemy.orm import declarative_base

db_url = f"postgresql://postgres:postgres@localhost:5432/damnit_bot"

engine = create_engine(db_url, pool_pre_ping=True, pool_recycle=300)

SessionMaker = sessionmaker(bind=engine)

Base = declarative_base()


class Users_News(Base):
    __tablename__ = 'users_news'
    id = Column(UUID, primary_key=True, default=uuid4)
    user_id = Column(UUID, ForeignKey('users.id'), nullable=True)
    news_id = Column(UUID, ForeignKey('news.id'), nullable=True)


class Users(Base):
    __tablename__ = 'users'

    id = Column(UUID, primary_key=True, default=uuid4)
    fullname = Column(String, nullable=True)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    news = relationship("Users_News", backref="user")


class News(Base):
    __tablename__ = 'news'
    id = Column(UUID, primary_key=True, default=uuid4)
    title = Column(String, nullable=True)
    short_info = Column(String, nullable=True)
    info = Column(String, nullable=True)
    users = relationship("Users_News", backref="news")


class Store(Base):
    __tablename__ = 'store'
    id = Column(UUID, primary_key=True, default=uuid4)
    title = Column(String, nullable=True)
    short_info = Column(String, nullable=True)
    info = Column(String, nullable=True)


if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)