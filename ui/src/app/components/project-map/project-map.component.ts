import { Component, Input, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Project } from '../../types/project.type';

@Component({
    selector: 'app-project-map',
    templateUrl: './project-map.component.html',
    styleUrl: './project-map.component.scss'
})
export class ProjectMapComponent {
    
    @Input() project!: Project;

    @ViewChild('map') map!: GoogleMap;

    options: google.maps.MapOptions = {
        mapTypeId: 'hybrid',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,

        center: { 
            lat: 0,
            lng: 0,
        },
        zoom: 0,
    };

    boundsChanged() {
        console.log(this.map.getCenter()?.lat(), this.map.getCenter()?.lng(), this.map.getZoom());
    }

}
