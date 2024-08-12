import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { Observable } from 'rxjs';
import { Project } from '../../types/project.type';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {

    projects$!: Observable<Project[]>;

    constructor(
        private dialog: MatDialog,
        private projectService: ProjectService,
        public userService: UserService,
    ) { }

    ngOnInit(): void {
        this.getProjects();
    }

    getProjects() {
        this.projects$ = this.projectService.get_projects();
    }

    createProject() {
        this.dialog
            .open(ProjectCreateComponent)
            .afterClosed()
            .subscribe(
                () => {
                    this.getProjects();
                }
            );
    }

}
