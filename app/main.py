import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="/frontend/static"), name="static")
templates = Jinja2Templates(directory="/frontend/templates")

if __name__ == "__main__":
    uvicorn.run(app)