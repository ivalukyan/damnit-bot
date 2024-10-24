"""
Home module
"""
from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton
)

router = Router()


@router.message(CommandStart())
async def home_menu(message: Message):
    await message.answer('Добрый день, {}'.format(message.from_user.first_name), reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='О компании', callback_data='company_info')],
            [InlineKeyboardButton(text='Быстрый заказ', callback_data='quick_order')],
            [InlineKeyboardButton(text='Расчет стоимости заказа', callback_data='calculation_order')],
            [InlineKeyboardButton(text='Авторизация', callback_data='authorization')],
            [InlineKeyboardButton(text='Смена языка', callback_data='changing_language')]
        ]
    ))

