import asyncio
import logging
import sys

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from bot_conf import bot_token

from home_menu.home_menu import router as home_menu_router
from home_menu.company_info import router as company_info_router
from home_menu.faq import router as faq_router
from home_menu.admin import router as admin_router


async def main():
    bot = Bot(token=bot_token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))

    dp = Dispatcher()
    dp.include_routers(home_menu_router, company_info_router, faq_router, admin_router)
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())