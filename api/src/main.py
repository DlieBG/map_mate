from project import router as project_router
from map import router as map_router
from fastapi import FastAPI

app = FastAPI()

app.include_router(project_router)
app.include_router(map_router)
