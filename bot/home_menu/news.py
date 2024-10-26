from aiogram import Router, F
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton, CallbackQuery
)

router = Router()


@router.callback_query(lambda call: call.data == 'news' or call.data == 'news_back')
async def news_callback(call: CallbackQuery):
    await call.message.edit_text('Закон о рекламе', reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='Согласен(а)', callback_data='news_approve')],
            [InlineKeyboardButton(text='Назад', callback_data='back_home_menu')]
        ]
    ))


@router.callback_query(lambda call: call.data == 'news_approve' or  call.data == 'news_approve_back')
async def new_rate(call: CallbackQuery):
    await call.message.edit_text('Выберите тариф подписки', reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='Платный тариф', callback_data='news_paid_rate')],
            [InlineKeyboardButton(text='Бесплатный тариф', callback_data='news_free_rate')],
            [InlineKeyboardButton(text='Назад', callback_data='news_back')]
        ]
    ))


@router.callback_query(F.data == 'news_paid_rate')
async def news_paid_rate(call: CallbackQuery):
    await call.message.edit_text('Информация о платном тарифе', reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='Подключить', callback_data='enable_paid_rate')],
            [InlineKeyboardButton(text='Назад', callback_data='news_approve_back')]
        ]
    ))


@router.callback_query(F.data == 'news_free_rate')
async def news_free_rate(call: CallbackQuery):
    await call.message.edit_text('Информация о бесплатном тарифе', reply_markup=InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text='Подключить', callback_data='enable_free_rate')],
            [InlineKeyboardButton(text='Назад', callback_data='news_approve_back')]
        ]
    ))


@router.callback_query(lambda call: call.data == 'enable_paid_rate' or call.data == 'enable_free_rate')
async def successful_connection(call: CallbackQuery):
    if call.data == 'enable_paid_rate':
        await call.message.edit_text('Вы подключили платный тариф', reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [InlineKeyboardButton(text='Назад в главное меню', callback_data='back_home_menu')]
            ]
        ))
    elif call.data == 'enable_free_rate':
        await call.message.edit_text('Вы подключили бесплтвный тариф', reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[
                [InlineKeyboardButton(text='Назад в главное меню', callback_data='back_home_menu')]
            ]
        ))
