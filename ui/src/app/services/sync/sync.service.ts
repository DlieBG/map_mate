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
            switch (event.key) {
                case STREET_VIEW_POSITION:
                    this.streetViewPosition$.next(JSON.parse(localStorage.getItem(STREET_VIEW_POSITION) || 'null'));
                    break;
            }
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

    clearAll() {
        this.setStreetViewPosition();
    }

}
