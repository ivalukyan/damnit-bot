import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth.routers import router as auth_router
from profile.routers import router as profile_router
from application_form.routers import router as application_form_router
from news.routers import router as news_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
async def root():
    return {"message": "DamnIT Bot"}

app.include_router(profile_router)
app.include_router(auth_router)
app.include_router(application_form_router)
app.include_router(news_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)