from models import PointMarkerGroup, PointMarkerGroupDto, PointMarker, PointMarkerDto
from fastapi import APIRouter
import db

router = APIRouter(
    prefix='/api/point',
)

@router.get('/group/{project}')
def get_groups(project: str) -> list[PointMarkerGroup]:
    return [
        PointMarkerGroup.model_validate(
            obj=group,
        ) for group in db.marker_groups.find(
            filter={
                'project': project,
            },
        )
    ]

@router.post('/group')
def create_group(group: PointMarkerGroupDto):
    db.marker_groups.insert_one(
        document=group.model_dump(),
    )

@router.get('/marker/{group}')
def get_markers(group: str) -> list[PointMarker]:
    return [
        PointMarker.model_validate(
            obj=marker,
        ) for marker in db.markers.find(
            filter={
                'group': group,
            },
        )
    ]

@router.post('/marker')
def create_marker(marker: PointMarkerDto):
    db.markers.insert_one(
        document=marker.model_dump(),
    )
