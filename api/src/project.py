from models import Project, ProjectDto
from fastapi import APIRouter
from bson import ObjectId
import db

router = APIRouter(
    prefix='/api/project',
)

@router.get('/')
def get_projects() -> list[Project]:
    return [
        Project.model_validate(
            obj=project,
        ) for project in
        db.projects.find()
    ]

@router.get('/{id}')
def get_project(id: str) -> Project:
    return Project.model_validate(
        obj=db.projects.find_one(
            filter={
                '_id': ObjectId(
                    oid=id,
                )
            }
        ),
    )

@router.post('/')
def create_project(project: ProjectDto):
    db.projects.insert_one(
        document=project.model_dump(),
    )

@router.put('/{id}')
def update_project(id: str, project: ProjectDto):
    db.projects.update_one(
        filter={
            '_id': ObjectId(
                oid=id,
            ),
        },
        update={
            '$set': project.model_dump(),
        },
    )
