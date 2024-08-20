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

class PointMarkerGroup(BaseModel):
    id: PyObjectId = Field(
        alias='_id',
    )
    project: str
    name: str
    color: str

class PointMarkerGroupDto(BaseModel):
    project: str
    name: str
    color: str

class PointMarker(BaseModel):
    id: PyObjectId = Field(
        alias='_id',
    )
    group: str
    point: Point

class PointMarkerDto(BaseModel):
    group: str
    point: Point
