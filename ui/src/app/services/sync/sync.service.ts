import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const MAP_CENTER_POSITION = 'mapCenterPosition';
const STREET_VIEW_POSITION = 'streetViewPosition';
const MAP3D_CENTER_POSITION = 'map3dCenterPosition';

@Injectable({
    providedIn: 'root'
})
export class SyncService {

    mapCenterPosition$ = new BehaviorSubject<google.maps.LatLngLiteral | null>(JSON.parse(localStorage.getItem(MAP_CENTER_POSITION) || 'null'));
    streetViewPosition$ = new BehaviorSubject<google.maps.LatLngLiteral | null>(JSON.parse(localStorage.getItem(STREET_VIEW_POSITION) || 'null'));
    map3dCenterPosition$ = new BehaviorSubject<google.maps.LatLngLiteral | null>(JSON.parse(localStorage.getItem(MAP3D_CENTER_POSITION) || 'null'));

    constructor() {
        window.addEventListener('storage', this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        if (event.storageArea == localStorage)
            switch (event.key) {
                case MAP_CENTER_POSITION:
                    this.mapCenterPosition$.next(JSON.parse(localStorage.getItem(MAP_CENTER_POSITION) || 'null'));
                    break;
                case STREET_VIEW_POSITION:
                    this.streetViewPosition$.next(JSON.parse(localStorage.getItem(STREET_VIEW_POSITION) || 'null'));
                    break;
                case MAP3D_CENTER_POSITION:
                    this.map3dCenterPosition$.next(JSON.parse(localStorage.getItem(MAP3D_CENTER_POSITION) || 'null'));
                    break;
            }
    }

    setMapCenterPosition(value: google.maps.LatLng | null = null, update: boolean = false) {
        const position = value ? {
            lat: value?.lat(),
            lng: value?.lng(),
        } : null;

        localStorage.setItem(MAP_CENTER_POSITION, JSON.stringify(position));

        if (update)
            this.mapCenterPosition$.next(position);
    }

    setStreetViewPosition(value: google.maps.LatLng | null = null, update: boolean = false) {
        const position = value ? {
            lat: value?.lat(),
            lng: value?.lng(),
        } : null;

        localStorage.setItem(STREET_VIEW_POSITION, JSON.stringify(position));

        if (update)
            this.streetViewPosition$.next(position);
    }
    
    setMap3dCenterPosition(value: google.maps.LatLngLiteral | null = null, update: boolean = false) {
        localStorage.setItem(MAP3D_CENTER_POSITION, JSON.stringify(value));

        if (update)
            this.map3dCenterPosition$.next(value);
    }

    clearAll() {
        this.setMapCenterPosition();
        this.setStreetViewPosition();
        this.setMap3dCenterPosition();
    }

}
