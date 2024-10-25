from aiogram import Router, F
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton, CallbackQuery
)

router = Router()


@router.callback_query(F.data == 'faq')
async def company_info(call: CallbackQuery):
    await call.message.edit_text('Тестовый текст FAQ', reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='Тест 1', callback_data='test_1')],
            [InlineKeyboardButton(text='Тест 2', callback_data='test_2')],
            [InlineKeyboardButton(text='Назад', callback_data='back_home_menu')]
        ]
    ))