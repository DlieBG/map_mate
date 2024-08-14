import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { SyncService } from '../../services/sync/sync.service';
import { interval, Observable, take } from 'rxjs';

@Component({
    selector: 'app-project-streetview',
    templateUrl: './project-streetview.component.html',
    styleUrl: './project-streetview.component.scss'
})
export class ProjectStreetviewComponent {

    @ViewChild('streetview') streetview!: GoogleMap;

    initialized$: Observable<number> = interval(1000).pipe(take(2));

    constructor(
        private syncService: SyncService,
    ) { }

    mapInitialized() {
        try {
            this.streetview.getStreetView().setVisible(true);

            this.streetview
                .getStreetView()
                .addListener('position_changed', () => {
                    this.syncService.setStreetViewPosition(this.streetview.getStreetView().getPosition());
                });

            this.syncService.streetViewPosition$.subscribe(
                (value) => {
                    this.streetview.getStreetView().setPosition(value);
                }
            );
        } catch {
            setTimeout(this.mapInitialized.bind(this), 1000);
        }
    }

    close() {
        window.close();
    }

}
