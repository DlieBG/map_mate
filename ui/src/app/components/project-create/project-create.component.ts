import { Component, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project/project.service';
import { ProjectDto } from '../../types/project.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';

@Component({
    selector: 'app-project-create',
    templateUrl: './project-create.component.html',
    styleUrl: './project-create.component.scss'
})
export class ProjectCreateComponent {

    project: ProjectDto = {
        name: '',
        description: '',
        view: {
            point: {
                lat: 0,
                lng: 0,
            },
            zoom: 0,
        },
    };

    @ViewChild('map') map!: GoogleMap;

    options: google.maps.MapOptions = {
        mapTypeId: 'hybrid',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,

        center: {
            lat: 51.07731991612368,
            lng: 10.331085402428783,
        },
        zoom: 7,
    };

    constructor(
        private snackbar: MatSnackBar,
        private dialog: MatDialogRef<ProjectCreateComponent>,
        private projectService: ProjectService,
    ) { }

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

    create() {
        this.projectService
            .create_project(this.project)
            .subscribe(
                () => {
                    this.snackbar.open('Project created successfully', '', {
                        duration: 3000,
                    });

                    this.dialog.close();
                }
            );
    }

}
