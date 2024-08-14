import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../types/project.type';
import { ProjectService } from '../../services/project/project.service';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.component.html',
    styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent implements OnInit {

    @ViewChild('map') map!: GoogleMap;

    options!: google.maps.MapOptions;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public project: Project,
        private snackbar: MatSnackBar,
        private dialog: MatDialogRef<ProjectEditComponent>,
        private projectService: ProjectService,
    ) { }

    ngOnInit(): void {
        this.options = {
            mapTypeId: 'hybrid',
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,

            center: {
                lat: this.project.view.point.lat,
                lng: this.project.view.point.lng,
            },
            zoom: this.project.view.zoom,
        };
    }

    boundsChanged() {
        const center = this.map.getCenter();

        this.project.view = {
            point: {
                lat: center?.lat() || 0,
                lng: center?.lng() || 0,
            },
            zoom: this.map.getZoom() || 0,
        };
    }

    update() {
        this.projectService
            .update_project(this.project._id, this.project)
            .subscribe(
                () => {
                    this.snackbar.open('Project updated successfully', '', {
                        duration: 3000
                    });

                    this.dialog.close();
                }
            );
    }

}
