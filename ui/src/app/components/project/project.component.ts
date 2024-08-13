import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../types/project.type';
import { ProjectService } from '../../services/project/project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {

    id!: string;
    project$!: Observable<Project>;

    constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params) => {
                this.id = params['id'];
                this.getProject();
            }
        );
    }

    getProject() {
        this.project$ = this.projectService.get_project(this.id);
    }

    openPopup(path: string) {
        window.open(
            `${this.id}/${path}`,
            path,
            'width=1200,height=800,left=100,top=100',
        );
    }

}
