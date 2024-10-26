from aiogram import Router, F, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton, CallbackQuery
)

router = Router()


@router.callback_query(F.data == 'authorization')
async def authorization_callback(call: CallbackQuery):
    await call.message.edit_text('Авторизация',
                                 reply_markup=InlineKeyboardMarkup(inline_keyboard=[
                                     [InlineKeyboardButton(text='Авторизация', url='http://localhost:8000/auth')],
                                     [InlineKeyboardButton(text='Назад', callback_data='back_home_menu')]
                                 ]))