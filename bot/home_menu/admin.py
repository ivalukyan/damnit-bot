"""
Admin module
"""
from aiogram import Router
from aiogram.filters import Command
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    CallbackQuery,
    WebAppInfo
)

router = Router()


@router.message(Command("admin"))
async def home_menu(message: Message):
    await message.answer('Здравствуйте, {}'.format(message.from_user.first_name), reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='ЛК', web_app=WebAppInfo(url="https://ivalukyan-frontend-damnitbot-da62.twc1.net/admin/login"))],
        ]
    ))