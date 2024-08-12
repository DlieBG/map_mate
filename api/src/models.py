from pydantic import BaseModel, BeforeValidator, Field
from typing import Annotated, Optional

PyObjectId = Annotated[str, BeforeValidator(str)]

class Point(BaseModel):
    x: float
    y: float

class Project(BaseModel):
    id: PyObjectId = Field(
        alias='_id',
    )
    name: str
    description: str
    goal: Optional[Point]

class ProjectDto(BaseModel):
    name: str
    description: str
    goal: Optional[Point] = None
    