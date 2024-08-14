import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Project } from '../../types/project.type';
import { SyncService } from '../../services/sync/sync.service';
import { take } from 'rxjs';

@Component({
    selector: 'app-project-map',
    templateUrl: './project-map.component.html',
    styleUrl: './project-map.component.scss'
})
export class ProjectMapComponent implements OnInit {

    @Input() project!: Project;

    @ViewChild('map') map!: GoogleMap;

    options!: google.maps.MapOptions;

    streetViewLabel = {
        text: "\ue4eb",
        fontFamily: "Material Icons",
        color: "#ffffff",
        fontSize: "24px",
    };

    map3dLabel = {
        text: "\ue84d",
        fontFamily: "Material Icons",
        color: "#ffffff",
        fontSize: "24px",
    };

    constructor(
        public syncService: SyncService,
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
        try {
            this.map
                .getStreetView()
                .addListener('position_changed', () => {
                    this.syncService.setStreetViewPosition(this.map.getStreetView().getPosition(), true);

                    this.map.getStreetView().setVisible(false);
                });
        } catch {
            setTimeout(this.mapInitialized.bind(this), 1000);
        }
    }

    boundsChanged() {
        this.syncService.setMapCenterPosition(this.map.getCenter());
    }

    panToStreetView() {
        this.syncService.streetViewPosition$
            .pipe(
                take(1)
            )
            .subscribe(
                (position) => {
                    if (position)
                        this.map.panTo(position);
                }
            );
    }

    panToMap3dCenter() {
        this.syncService.map3dCenterPosition$
            .pipe(
                take(1)
            )
            .subscribe(
                (position) => {
                    if (position)
                        this.map.panTo(position);
                }
            );
    }

}
