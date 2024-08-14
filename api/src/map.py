from fastapi import APIRouter
import os

router = APIRouter(
    prefix='/api/map',
)

@router.get('/key')
def get_map_key() -> str:
    return os.getenv('GOOGLE_MAPS_API_KEY')
