from fastapi import FastAPI
from app.api import router
from fastapi.middleware.cors import CORSMiddleware

import app.simulator

app = FastAPI(title="One Big Exchange")

# allowed all origins for now
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)




