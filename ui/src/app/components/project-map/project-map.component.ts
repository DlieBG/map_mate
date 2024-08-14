import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Project } from '../../types/project.type';
import { SyncService } from '../../services/sync/sync.service';

@Component({
    selector: 'app-project-map',
    templateUrl: './project-map.component.html',
    styleUrl: './project-map.component.scss'
})
export class ProjectMapComponent implements OnInit {

    @Input() project!: Project;

    @ViewChild('map') map!: GoogleMap;

    options!: google.maps.MapOptions;

    constructor(
        private syncService: SyncService,
    ) { }

    ngOnInit(): void {
        this.options = {
            mapTypeId: 'hybrid',
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,

            center: {
                lat: this.project.view.point.lat,
                lng: this.project.view.point.lng,
            },
            zoom: this.project.view.zoom,
        };
    }

    mapInitialized() {
        this.map
            .getStreetView()
            .addListener('pano_changed', () => {
                this.syncService.setStreetViewPosition(
                    this.map.getStreetView().getPosition()
                );

                this.map.getStreetView().setVisible(false);
            });
    }

    boundsChanged() {
        console.log(this.map.getCenter()?.lat(), this.map.getCenter()?.lng(), this.map.getZoom());
    }

}
