from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.userManagement import sessions_router

app = FastAPI()

app.include_router(sessions_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
