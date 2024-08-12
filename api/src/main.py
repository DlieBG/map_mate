from project import router as project_router
from fastapi import FastAPI

app = FastAPI()

app.include_router(project_router)
