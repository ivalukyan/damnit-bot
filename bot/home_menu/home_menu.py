"""
Home module
"""
from aiogram import Router, F
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    CallbackQuery,
    WebAppInfo
)

router = Router()


@router.message(CommandStart())
async def home_menu(message: Message):
    await message.answer('Здравствуйте, {}'.format(message.from_user.first_name), reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='О компании', callback_data='company_info')],
            [InlineKeyboardButton(text='FAQ/Контакты', callback_data='faq')],
            [InlineKeyboardButton(text='ЛК', web_app=WebAppInfo(url='https://ivalukyan-damnit-bot-14d7.twc1.net'))],
        ]
    ))





@router.callback_query(F.data == 'back_home_menu')
async def quick_order(call: CallbackQuery):
    await call.message.edit_text('Добрый день, {}'.format(call.message.chat.first_name), reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='О компании', callback_data='company_info')],
            [InlineKeyboardButton(text='FAQ/Контакты', callback_data='faq')],
            [InlineKeyboardButton(text='ЛК', web_app=WebAppInfo(url="https://ivalukyan-damnit-bot-14d7.twc1.net"))],

        ]
    ))