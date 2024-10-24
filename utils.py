import logging


def logger_info(func):
    def wrapper():
        res = func()
        return logging.basicConfig(level=logging.DEBUG, format=f"%H-%M %d-%m-%Y {res}")
    return wrapper
