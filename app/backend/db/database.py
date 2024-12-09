from uuid import uuid4

from pygments.lexer import default
from sqlalchemy import (Column, String, UUID, ForeignKey, BigInteger, ARRAY)
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

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
    __tablename__ = "store"
    id = Column(UUID, primary_key=True, default=uuid4)
    title = Column(String, nullable=True)
    short_info = Column(String, nullable=True)
    info = Column(String, nullable=True)


class Chat(Base):
    __tablename__ = 'chat'
    id = Column(UUID, primary_key=True, default=uuid4)
    telegram_id = Column(BigInteger, nullable=False)
    messages = Column(ARRAY(String), nullable=True)


class Admin(Base):
    __tablename__ = 'admins'
    id = Column(UUID, primary_key=True, default=uuid4)
    fullname = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)


class Messages(Base):
    __tablename__ = 'messages'
    id = Column(UUID, primary_key=True, default=uuid4)
    chat_id = Column(UUID, nullable=True)
    content = Column(String, nullable=True)
    role = Column(String, nullable=True)


class Chats(Base):
    __tablename__ = 'chats'
    id = Column(UUID, primary_key=True, default=uuid4)
    chat_id = Column(UUID, nullable=True)
    fullname = Column(String, nullable=True)


if __name__ == '__main__':
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)