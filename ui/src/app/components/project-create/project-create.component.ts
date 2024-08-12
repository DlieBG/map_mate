import { Component } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { ProjectDto } from '../../types/project.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html',
    styleUrl: './project-create.component.scss'
})
export class ProjectCreateComponent {

    project: ProjectDto = {
        name: '',
        description: '',
    };

    constructor(
        private snackbar: MatSnackBar,
        private dialog: MatDialogRef<ProjectCreateComponent>,
        private projectService: ProjectService,
    ) { }

    create() {
        this.projectService
            .create_project(this.project)
            .subscribe(
                () => {
                    this.snackbar.open('Project created successfully', '', {
                        duration: 3000
                    });

                    this.dialog.close();
                }
            );
    }

}
