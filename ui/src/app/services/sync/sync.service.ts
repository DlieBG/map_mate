import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STREET_VIEW_POSITION = 'streetViewPosition';

@Injectable({
    providedIn: 'root'
})
export class SyncService {

    streetViewPosition$ = new BehaviorSubject<google.maps.LatLngLiteral | null>(JSON.parse(localStorage.getItem(STREET_VIEW_POSITION) || 'null'));

    constructor() {
        window.addEventListener('storage', this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        if (event.storageArea == localStorage)
            switch(event.key) {
                case STREET_VIEW_POSITION:
                    this.streetViewPosition$.next(JSON.parse(event.newValue || 'null'));
                    break;
            }
    }

    setStreetViewPosition(value: google.maps.LatLng | null = null) {
        if (!value)
            return localStorage.removeItem(STREET_VIEW_POSITION);

        localStorage.setItem(
            STREET_VIEW_POSITION,
            JSON.stringify({
                lat: value?.lat(),
                lng: value?.lng(),
            }),
        );
    }

    clearAll() {
        this.setStreetViewPosition();
    }

}
