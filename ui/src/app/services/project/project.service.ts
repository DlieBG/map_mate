import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, ProjectDto } from '../../types/project.type';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    get_projects(): Observable<Project[]> {
        return this.httpClient.get<Project[]>('api/project/');
    }

    get_project(id: string): Observable<Project> {
        return this.httpClient.get<Project>(`api/project/${id}`);
    }

    create_project(project: ProjectDto): Observable<null> {
        return this.httpClient.post<null>('api/project/', project);
    }

    update_project(id: string, project: ProjectDto): Observable<null> {
        return this.httpClient.put<null>(`api/project/${id}`, project);
    }

}
