import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Project } from '../../types/project.type';
import { ProjectService } from '../../services/project/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectEditComponent } from '../project-edit/project-edit.component';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit, OnDestroy {

    project$!: Observable<Project>;
    project!: Project;

    windows: (WindowProxy | null)[] = [];

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private projectService: ProjectService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params) => {
                this.getProject(params['id']);
            }
        );
    }

    ngOnDestroy(): void {
        for (let window of this.windows)
            window?.close();
    }

    getProject(id: string) {
        this.project$ = this.projectService
            .get_project(id)
            .pipe(
                tap(
                    (project) => {
                        this.project = project;
                    }
                )
            );
    }

    editProject() {
        this.dialog
            .open(ProjectEditComponent, {
                width: 'calc(690px + 2em)',
                maxWidth: 'calc(690px + 2em)',
                data: this.project,
            })
            .afterClosed()
            .subscribe(
                () => {
                    this.getProject(this.project._id);
                }
            );
    }

    openPopup(path: string) {
        this.windows.push(
            window.open(
                `${this.project._id}/${path}`,
                path,
                'width=1200,height=800,left=100,top=100',
            )
        );
    }

}
