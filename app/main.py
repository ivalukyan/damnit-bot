import uvicorn
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse

from backend.profile import router as profile_router
from backend.auth.routers import router as auth_router

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

@app.get('/')
async def index(request: Request):
    redirect_url = request.url_for("auth")
    return RedirectResponse(redirect_url)
app.include_router(profile_router)
app.include_router(auth_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)