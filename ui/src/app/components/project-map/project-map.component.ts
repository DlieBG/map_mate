import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Project } from '../../types/project.type';

@Component({
    selector: 'app-project-map',
    templateUrl: './project-map.component.html',
    styleUrl: './project-map.component.scss'
})
export class ProjectMapComponent implements OnInit {

    @Input() project!: Project;

    @ViewChild('map') map!: GoogleMap;

    options!: google.maps.MapOptions;

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
        console.log(this.map.getCenter()?.lat(), this.map.getCenter()?.lng(), this.map.getZoom());
    }

}
