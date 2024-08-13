from pydantic import BaseModel, BeforeValidator, Field
from typing import Annotated, Optional

PyObjectId = Annotated[str, BeforeValidator(str)]

class Point(BaseModel):
    lat: float
    lng: float

class MapView(BaseModel):
    point: Point
    zoom: int

class Project(BaseModel):
    id: PyObjectId = Field(
        alias='_id',
    )
    name: str
    description: str
    view: MapView
    goal: Optional[Point]

class ProjectDto(BaseModel):
    name: str
    description: str
    view: MapView
    goal: Optional[Point] = None
    